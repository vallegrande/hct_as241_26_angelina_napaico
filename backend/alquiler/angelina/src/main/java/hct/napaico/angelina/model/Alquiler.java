package hct.napaico.angelina.model;
import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "alquiler") 
public class Alquiler {
    @Id
    private String id;
    private String clienteId;
    private String dias;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private Double total;
    private String estado;
}
