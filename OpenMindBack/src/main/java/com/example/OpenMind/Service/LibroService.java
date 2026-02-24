package com.example.OpenMind.Service;

import com.example.OpenMind.Entity.Libro;
import com.example.OpenMind.Repository.LibroRepository;

import com.example.OpenMind.dto.LibroDTO;
import com.example.OpenMind.mapper.LibroMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LibroService {

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private LibroMapper libroMapper;

    @Transactional(readOnly = true)
    public List<LibroDTO> listarLibros() {
        return libroRepository.findAll().stream()
                .map(libroMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public LibroDTO obtenerLibroPorId(Long id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
        return libroMapper.toDTO(libro);
    }

    @Transactional
    public LibroDTO crearLibro(LibroDTO libroDTO) {
        Libro libro = libroMapper.toEntity(libroDTO);
        // Inicialización obligatoria
        libro.setDescargasTotales(0);
        libro.setVistasTotales(0);
        return libroMapper.toDTO(libroRepository.save(libro));
    }

    @Transactional
    public LibroDTO actualizarLibro(Long id, LibroDTO libroDTO) {
        // 1. Buscamos el libro real con sus estadísticas actuales
        Libro existente = libroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));

        // 2. MapStruct copia solo los campos presentes en el DTO
        // Las estadísticas y listas se mantienen intactas gracias al ignore del mapper
        libroMapper.actualizarDesdeDto(libroDTO, existente);

        return libroMapper.toDTO(libroRepository.save(existente));
    }

    @Transactional
    public void eliminarLibro(Long id) {
        if (!libroRepository.existsById(id)) {
            throw new RuntimeException("Libro no encontrado");
        }
        libroRepository.deleteById(id);
    }

    @Transactional
    public LibroDTO incrementarVistas(Long id) {
        Libro libro = libroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
        libro.setVistasTotales(libro.getVistasTotales() + 1);
        return libroMapper.toDTO(libroRepository.save(libro));
    }
}