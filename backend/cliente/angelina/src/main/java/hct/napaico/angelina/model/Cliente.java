package hct.napaico.angelina.model;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Indexed;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("cliente") 
public class Cliente {
    @Id
    private String id;

    private String dni;

    private String nombres;

    private String apellidos;

    private String celular;

    private String correo;

    private String licencia;

    private String estado;
}
