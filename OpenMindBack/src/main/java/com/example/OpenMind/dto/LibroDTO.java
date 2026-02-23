package com.example.OpenMind.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibroDTO {
    private Long id;
    private String autor;
    private String titulo;
    private String descripcion;
    private String portada;
    private Integer paginas;
    private String archivoPdf;
    private Integer descargasTotales;
    private Integer vistasTotales;
    private Integer stock;
}