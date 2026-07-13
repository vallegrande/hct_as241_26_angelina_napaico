package hct.napaico.angelina.rest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import hct.napaico.angelina.model.Alquiler;
import hct.napaico.angelina.service.AlquilerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/alquiler")
@RestController
public class AlquilerRest {
    private final AlquilerService service;
    @GetMapping()
    public Flux<Alquiler> getAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Mono<Alquiler> getById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping()
    public Mono<Alquiler> create(@RequestBody Alquiler alquiler) {        
        return service.save(alquiler);
    }

    @PatchMapping("/{id}/estado/{estado}")
    public Mono<Alquiler> updateEstado(@PathVariable String id, @PathVariable String estado) {
        return service.updateEstado(id, estado);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) 
    public Mono<Void> deletePhysical(@PathVariable String id) {
        return service.deleteById(id);
    }
}
