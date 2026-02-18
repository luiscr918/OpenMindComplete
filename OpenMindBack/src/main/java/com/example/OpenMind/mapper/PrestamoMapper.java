package com.example.OpenMind.mapper;

import com.example.OpenMind.Entity.Prestamo;

import com.example.OpenMind.dto.PrestamoDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PrestamoMapper {

    @Mapping(source = "usuario.id", target = "usuarioId")
    @Mapping(source = "libro.id", target = "libroId")
    @Mapping(source = "usuario.nombreCompleto", target = "nombreUsuario")
    @Mapping(source = "libro.titulo", target = "tituloLibro")
    PrestamoDTO toDTO(Prestamo prestamo);

    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "libro", ignore = true)
    Prestamo toEntity(PrestamoDTO prestamoDTO);

    // Para actualizaciones parciales o devoluciones
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "libro", ignore = true)
    void actualizarDesdeDto(PrestamoDTO dto, @MappingTarget Prestamo entidad);
}