package com.example.OpenMind.Entity;

import com.example.OpenMind.Enums.EstadoPrestamo;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate fechaSalida;


    private LocalDate fechaDevolucion;

    @NotNull
    @Enumerated(EnumType.STRING)
    private EstadoPrestamo estadoPrestamo;

    //relacion con usuario
    @ManyToOne
    @JoinColumn(name= "usuario_id")
    private Usuario usuario;

    //relacion con libro
    @ManyToOne
    @JoinColumn(name ="libro_id")
    private Libro libro;
}
