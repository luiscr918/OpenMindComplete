package com.example.OpenMind.mapper;

import com.example.OpenMind.Entity.Ejemplar;
import com.example.OpenMind.dto.EjemplarDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface EjemplarMapper {

    // Entidad a DTO
    @Mapping(source = "libro.id", target = "libroId")
    EjemplarDTO toDTO(Ejemplar ejemplar);

    // DTO a Entidad
    @Mapping(target = "libro", ignore = true)
    Ejemplar toEntity(EjemplarDTO ejemplarDTO);
    // Actualiza la entidad existente sin crear una nueva y omite nulos
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "libro", ignore = true)
    void actualizarDesdeDto(EjemplarDTO dto, @MappingTarget Ejemplar entidad);
}