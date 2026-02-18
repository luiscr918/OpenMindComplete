package com.example.OpenMind.mapper;

import com.example.OpenMind.Entity.Libro;

import com.example.OpenMind.dto.LibroDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface LibroMapper {

    LibroDTO toDTO(Libro libro);

    @Mapping(target = "prestamos", ignore = true)
    @Mapping(target = "ejemplares", ignore = true)
    Libro toEntity(LibroDTO libroDTO);

    // Método clave para no perder datos (como estadísticas) al actualizar
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "prestamos", ignore = true)
    @Mapping(target = "ejemplares", ignore = true)
   /* @Mapping(target = "descargasTotales", ignore = true) // Protegemos contadores
    @Mapping(target = "vistasTotales", ignore = true)*/    // Protegemos contadores
    void actualizarDesdeDto(LibroDTO dto, @MappingTarget Libro entidad);
}