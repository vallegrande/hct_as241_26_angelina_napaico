package hct.napaico.angelina.service;

import hct.napaico.angelina.model.Cliente;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ClienteService {
    Flux<Cliente> findAll();
    Mono<Cliente> findById(String id);
    Mono<Cliente> save(Cliente cliente);
    Mono<Cliente> update(Cliente cliente, String id);
    Mono<Void> deleteLogical(String id);
    Mono<Void> restoreLogical(String id);
}
