package hct.napaico.angelina.service.Impl;

import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import hct.napaico.angelina.client.ClienteClient;
import hct.napaico.angelina.model.Alquiler;
import hct.napaico.angelina.repository.AlquilerRepository;
import hct.napaico.angelina.service.AlquilerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlquilerServiceImpl implements AlquilerService{

    private final AlquilerRepository alquilerRepository;
    private final ClienteClient clienteClient;
    @Override
    public Flux<Alquiler> findAll() {
        return alquilerRepository.findAll();
    }

    @Override
    public Mono<Alquiler> findById(String id) {
        return alquilerRepository.findById(id);
    }

    @Override
    public Mono<Alquiler> save(Alquiler alquiler) {
        try {
            long diasIngresados = Long.parseLong(alquiler.getDias());
            long diasCalculados = ChronoUnit.DAYS.between(alquiler.getFechaInicio(), alquiler.getFechaFin());

            if (diasIngresados != diasCalculados) {
                return Mono.error(new IllegalArgumentException(
                    "Error: Los días ingresados (" + diasIngresados + ") no coinciden con las fechas (" + diasCalculados + " días de diferencia)."
                ));
            }
        } catch (NumberFormatException e) {
            return Mono.error(new IllegalArgumentException("El campo 'dias' debe ser numérico."));
        }

        String clienteId = alquiler.getClienteId();
        return clienteClient.getClienteId(clienteId)
                .switchIfEmpty(Mono.error(new ResponseStatusException(
                    HttpStatus.NOT_FOUND, 
                    "No existe el cliente con ID: " + clienteId
                )))
                .flatMap(existing -> {
                    alquiler.setEstado("PENDIENTE");
                    return alquilerRepository.save(alquiler);
                });
    }

    @Override
    public Mono<Alquiler> updateEstado(String id, String nuevoEstado) {
        List<String> estadosValidos = List.of("PAGADO", "CANCELADO", "PENDIENTE");
        String estadoMayuscula = nuevoEstado.toUpperCase();

        if (!estadosValidos.contains(estadoMayuscula)) {
            return Mono.error(new IllegalArgumentException("Estado no válido. Use: PAGADO, CANCELADO o PENDIENTE."));
        }

        return alquilerRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Alquiler no encontrado para actualizar estado")))
                .flatMap(alquiler -> {
                    alquiler.setEstado(estadoMayuscula);
                    return alquilerRepository.save(alquiler);
                });
    }

    // Método para eliminar físicamente
    @Override
    public Mono<Void> deleteById(String id) {
        return alquilerRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Alquiler no encontrado para eliminar")))
                .flatMap(alquiler -> alquilerRepository.delete(alquiler));
    }
    
}
