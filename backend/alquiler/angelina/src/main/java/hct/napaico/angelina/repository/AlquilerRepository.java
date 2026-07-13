package hct.napaico.angelina.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

import hct.napaico.angelina.model.Alquiler;

public interface AlquilerRepository extends ReactiveMongoRepository<Alquiler, String>{
    
}
