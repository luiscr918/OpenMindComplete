package com.example.OpenMind.Service;

import com.example.OpenMind.Entity.Usuario;
import com.example.OpenMind.Repository.UsuarioRepository;
import com.example.OpenMind.dto.UsuarioDTO;
import com.example.OpenMind.mapper.UsuarioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioMapper usuarioMapper;

    @Transactional(readOnly = true)
    public List<UsuarioDTO> listarUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(usuarioMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UsuarioDTO obtenerUsuarioPorId(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return usuarioMapper.toDTO(usuario);
    }

    @Transactional
    public UsuarioDTO crearUsuario(UsuarioDTO usuarioDTO) {
        // Nota: Para la creación, usualmente se requiere un Password.
        // Si este DTO no lo trae, deberás manejar el password por separado
        // o usar un "UserCreateDTO" que sí lo incluya.
        Usuario usuario = usuarioMapper.toEntity(usuarioDTO);
        return usuarioMapper.toDTO(usuarioRepository.save(usuario));
    }

    @Transactional
    public UsuarioDTO actualizarUsuario(Long id, UsuarioDTO usuarioDTO) {
        // 1. Buscamos el usuario real
        Usuario existente = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // 2. MapStruct actualiza nombre, intereses, edad, etc.
        // Si algún campo en el DTO es null, se queda el valor que ya estaba en la BD.
        usuarioMapper.actualizarDesdeDto(usuarioDTO, existente);

        // 3. Guardamos la entidad actualizada
        return usuarioMapper.toDTO(usuarioRepository.save(existente));
    }

    @Transactional
    public void eliminarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }
}