package com.example.OpenMind.dto;

import com.example.OpenMind.Enums.Rol;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {
    private Long id;
    private Rol rol;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) // El cliente la envía, pero el API no la devuelve
    private String password;
    private String nombreCompleto;
    private String intereses;
    private Integer edad;
    private String ocupacion;
}