package com.example.OpenMind.dto;
import com.example.OpenMind.Enums.Rol;
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
    private String nombreCompleto;
    private String intereses;
    private Integer edad;
    private String ocupacion;
}