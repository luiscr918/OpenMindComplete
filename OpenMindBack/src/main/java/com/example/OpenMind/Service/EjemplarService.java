package com.example.OpenMind.Service;

import com.example.OpenMind.Entity.Ejemplar;
import com.example.OpenMind.Entity.Libro;
import com.example.OpenMind.Repository.EjemplarRepository;
import com.example.OpenMind.Repository.LibroRepository;

import com.example.OpenMind.dto.EjemplarDTO;
import com.example.OpenMind.mapper.EjemplarMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EjemplarService {

    @Autowired
    private EjemplarRepository ejemplarRepository;

    @Autowired
    private LibroRepository libroRepository;

    @Autowired
    private EjemplarMapper ejemplarMapper;

    public List<EjemplarDTO> listarEjemplares() {
        return ejemplarRepository.findAll().stream()
                .map(ejemplarMapper::toDTO)
                .collect(Collectors.toList());
    }

    public EjemplarDTO obtenerEjemplarPorId(Long id) {
        Ejemplar ejemplar = ejemplarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ejemplar no encontrado"));
        return ejemplarMapper.toDTO(ejemplar);
    }

    @Transactional
    public EjemplarDTO crearEjemplar(EjemplarDTO ejemplarDTO) {
        Ejemplar ejemplar = ejemplarMapper.toEntity(ejemplarDTO);

        Libro libro = libroRepository.findById(ejemplarDTO.getLibroId())
                .orElseThrow(() -> new RuntimeException("Libro no encontrado"));

        ejemplar.setLibro(libro);
        return ejemplarMapper.toDTO(ejemplarRepository.save(ejemplar));
    }

    @Transactional
    public EjemplarDTO actualizarEjemplar(Long id, EjemplarDTO ejemplarDTO) {
        // 1. Buscamos la entidad real de la base de datos
        Ejemplar existente = ejemplarRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ejemplar no encontrado"));

        // 2. MapStruct copia los datos del DTO a la entidad existente (ignorando nulos)
        ejemplarMapper.actualizarDesdeDto(ejemplarDTO, existente);

        // 3. Si el DTO trae un nuevo libroId, actualizamos la relación
        if (ejemplarDTO.getLibroId() != null) {
            Libro libro = libroRepository.findById(ejemplarDTO.getLibroId())
                    .orElseThrow(() -> new RuntimeException("Libro no encontrado"));
            existente.setLibro(libro);
        }

        return ejemplarMapper.toDTO(ejemplarRepository.save(existente));
    }

    public void eliminarEjemplar(Long id) {
        if (!ejemplarRepository.existsById(id)) {
            throw new RuntimeException("Ejemplar no encontrado");
        }
        ejemplarRepository.deleteById(id);
    }
}