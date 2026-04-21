package dev.emdashpolice;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
public class CaseResource {
    private final CaseCatalog catalog;

    public CaseResource(CaseCatalog catalog) {
        this.catalog = catalog;
    }

    @GET
    @Path("/status")
    public GameStatus status() {
        return catalog.status();
    }

    @GET
    @Path("/cases")
    public List<GameCase> cases() {
        return catalog.all();
    }

    @GET
    @Path("/cases/{id}")
    public GameCase caseById(@PathParam("id") int id) {
        return catalog.find(id)
                .orElseThrow(() -> new NotFoundException("Unknown case: " + id));
    }
}
