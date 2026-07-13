package hct.napaico.angelina.service.Impl;

import org.springframework.stereotype.Service;

import hct.napaico.angelina.model.Cliente;
import hct.napaico.angelina.repository.ClienteRepository;
import hct.napaico.angelina.service.ClienteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@Service
public class ClienteServiceImpl implements ClienteService{
    private final ClienteRepository repository;
    
    @Override
    public Flux<Cliente> findAll() {
        return repository.findAll();
    }

    @Override
    public Mono<Cliente> findById(String id) {
        return repository.findById(id);
    }

    @Override
    public Mono<Cliente> save(Cliente cliente) {
        log.info("cliente:", cliente);
        cliente.setDni(cliente.getDni());
        cliente.setEstado("Activo");
        return repository.save(cliente);
    }

    @Override
    public Mono<Cliente> update(Cliente cliente, String id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Cliente no encontrado")))
                .flatMap(existing->{
                    existing.setDni(cliente.getDni());
                    existing.setNombres(cliente.getNombres());
                    existing.setApellidos(cliente.getApellidos());
                    existing.setCelular(cliente.getCelular());
                    existing.setCorreo(cliente.getCorreo());
                    existing.setLicencia(cliente.getLicencia());

                    return repository.save(existing);
                });
            
    }

    @Override
    public Mono<Void> deleteLogical(String id) {
       return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("cliente no encontrado")))
                .flatMap(existing->{
                    existing.setEstado("Inactivo");

                    return repository.save(existing);
                }).then();
    }

    @Override
    public Mono<Void> restoreLogical(String id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("cliente no encontrado")))
                .flatMap(existing->{
                    existing.setEstado("Activo");
                    
                    return repository.save(existing);
                }).then();
    }
    
}
