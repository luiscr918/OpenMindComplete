package com.example.OpenMind.dto;

import com.example.OpenMind.Enums.EstadoPrestamo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoDTO {
    private Long id;
    private LocalDate fechaSalida;
    private LocalDate fechaDevolucion;
    private EstadoPrestamo estadoPrestamo;
    private Long usuarioId; // Referencia al ID del Usuario
    private String nombreUsuario; // Opcional, para mostrar en UI
    private Long libroId; // Referencia al ID del Libro
    private String tituloLibro; // Opcional, para mostrar en UI
}
