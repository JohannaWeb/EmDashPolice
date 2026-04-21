package dev.emdashpolice;

import java.util.List;

public record GameCase(
        int id,
        String sender,
        String title,
        String role,
        String text,
        boolean ai,
        String difficulty,
        String portrait,
        String dossier,
        List<String> clues,
        String explanation) {
}
