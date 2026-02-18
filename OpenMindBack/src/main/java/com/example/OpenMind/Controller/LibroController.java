package com.example.OpenMind.Controller;

import com.example.OpenMind.Entity.Libro;
import com.example.OpenMind.Service.LibroService;
import com.example.OpenMind.dto.LibroDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/libros")
public class LibroController {

    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @PostMapping
    public LibroDTO crearLibro(@Valid @RequestBody LibroDTO libro) {
        return libroService.crearLibro(libro);
    }

    @GetMapping
    public List<LibroDTO> listarLibros() {
        return libroService.listarLibros();
    }

    @GetMapping("/{id}")
    public LibroDTO obtenerLibro(@PathVariable Long id) {
        return libroService.obtenerLibroPorId(id);
    }

    @PutMapping("/{id}")
    public LibroDTO actualizarLibro(@PathVariable Long id,
                                 @Valid @RequestBody LibroDTO libro) {
        return libroService.actualizarLibro(id, libro);
    }

    @DeleteMapping("/{id}")
    public void eliminarLibro(@PathVariable Long id) {
        libroService.eliminarLibro(id);
    }
}
