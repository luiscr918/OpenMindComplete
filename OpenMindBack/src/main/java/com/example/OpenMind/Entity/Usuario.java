package com.example.OpenMind.Entity;


import com.example.OpenMind.Enums.Rol;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @NotNull
    @Column(unique = true)
    private String email;

    @NotNull
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
            message = "La contraseña debe tener al menos 8 caracteres, incluyendo letras y números"
    )
    private String password;

    @NotNull
    private String nombreCompleto;

    private String intereses;

    @Min(value = 18, message = "debe ser mayor de edad")
    @Max(value=100, message = "Edad maxima")
    private Integer edad;

    private String ocupacion;

    //relacion con prestamo
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prestamo> prestamos;


}
