package com.example.OpenMind.dto;

import lombok.Data;

@Data
public class EjemplarDTO {
    private Long id;
    private Long libroId; // Solo el ID para evitar redundancia
}