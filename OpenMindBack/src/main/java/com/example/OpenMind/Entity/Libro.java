package com.example.OpenMind.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor

public class Libro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String autor;
    @NotBlank
    @Column(unique = true)
    private String titulo;

    @NotBlank
    private String descripcion;

    @NotNull
    private String portada;

    @NotNull
    private Integer paginas;

    private String archivoPdf;

    private Integer descargasTotales;

    private Integer vistasTotales;
    private Integer stock;

    //relacion prestamo
    @OneToMany(mappedBy = "libro", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Prestamo> prestamos;


}
