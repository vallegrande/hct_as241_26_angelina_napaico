package hct.napaico.angelina.service;
import hct.napaico.angelina.model.Alquiler;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
public interface AlquilerService {
    Flux<Alquiler> findAll();
    Mono<Alquiler> findById(String id);
    Mono<Alquiler> save(Alquiler alquiler);
    Mono<Alquiler> updateEstado(String id, String estado);
    Mono<Void> deleteById(String id);
}
