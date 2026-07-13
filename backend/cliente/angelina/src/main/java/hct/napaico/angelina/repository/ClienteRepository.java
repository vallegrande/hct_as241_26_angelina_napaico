package hct.napaico.angelina.repository;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import hct.napaico.angelina.model.Cliente;

public interface ClienteRepository extends ReactiveMongoRepository<Cliente, String>{
    
}
