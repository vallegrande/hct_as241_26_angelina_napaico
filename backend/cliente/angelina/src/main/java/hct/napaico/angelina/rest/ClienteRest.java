package hct.napaico.angelina.rest;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hct.napaico.angelina.model.Cliente;
import hct.napaico.angelina.service.ClienteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins="*")
@RequestMapping("/api/cliente")
@RestController
public class ClienteRest {

    private final ClienteService service;

     @GetMapping()
    public Flux<Cliente> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Cliente> getById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping()
    public Mono<Cliente> create(@RequestBody Cliente cliente) {        
        return service.save(cliente);
    }


    @PutMapping("/{id}")
    public Mono<Cliente> update(@RequestBody Cliente cliente,@PathVariable String id) {        
        return service.update(cliente, id);
    }

    @PatchMapping("/{id}/delete")
    public Mono<Void> deleteLogical(@PathVariable String id){
        return service.deleteLogical(id);
    }

    @PatchMapping("/{id}/restore")
    public Mono<Void> restoreLogical(@PathVariable String id){
        return service.restoreLogical(id);
    }
}
