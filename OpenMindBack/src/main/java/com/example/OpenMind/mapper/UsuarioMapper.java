package com.example.OpenMind.mapper;

import com.example.OpenMind.Entity.Usuario;
import com.example.OpenMind.dto.UsuarioDTO;
import org.mapstruct.*;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UsuarioMapper {

    // Entidad a DTO
    UsuarioDTO toDTO(Usuario usuario);

    // DTO a Entidad
    @Mapping(target = "prestamos", ignore = true)
    Usuario toEntity(UsuarioDTO usuarioDTO);

    // Actualización segura de la entidad existente
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "prestamos", ignore = true)
    void actualizarDesdeDto(UsuarioDTO dto, @MappingTarget Usuario entidad);
}