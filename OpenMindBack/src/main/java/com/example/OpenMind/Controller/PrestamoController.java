package com.example.OpenMind.Controller;

import com.example.OpenMind.Entity.Prestamo;
import com.example.OpenMind.Service.PrestamoService;
import com.example.OpenMind.dto.PrestamoDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestamos")
public class PrestamoController {

    private final PrestamoService prestamoService;

    public PrestamoController(PrestamoService prestamoService) {
        this.prestamoService = prestamoService;
    }

    @PostMapping
    public PrestamoDTO crearPrestamo(@Valid @RequestBody PrestamoDTO prestamo) {
        return prestamoService.crearPrestamo(prestamo);
    }

    @GetMapping
    public List<PrestamoDTO> listarPrestamos() {
        return prestamoService.listarPrestamos();
    }

    @GetMapping("/{id}")
    public PrestamoDTO obtenerPrestamo(@PathVariable Long id) {
        return prestamoService.obtenerPrestamoPorId(id);
    }

    @PutMapping("/{id}/devolver")
    public PrestamoDTO devolverPrestamo(@PathVariable Long id) {
        return prestamoService.devolverPrestamo(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarPrestamo(@PathVariable Long id) {
        prestamoService.eliminarPrestamo(id);
    }
}
