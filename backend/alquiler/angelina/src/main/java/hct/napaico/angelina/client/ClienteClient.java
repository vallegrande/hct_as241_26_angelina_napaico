package hct.napaico.angelina.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import hct.napaico.angelina.dto.ClienteDTO;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class ClienteClient {

    private final WebClient webClient;

    public ClienteClient(@Value("${services.cliente.url}") String clienteUrl,
                         WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(clienteUrl).build();
    }

    public Mono<ClienteDTO> getClienteId(String clienteId) {
        return this.webClient.get()
                .uri("/api/cliente/{id}", clienteId)
                .retrieve()
                .bodyToMono(ClienteDTO.class)
                .onErrorResume(WebClientResponseException.NotFound.class, ex -> Mono.empty())
                .onErrorResume(ex -> Mono.just(new ClienteDTO(clienteId)));
    }
}
