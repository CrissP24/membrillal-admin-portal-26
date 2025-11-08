import { tramiteDefRepo, tramiteInstRepo } from '@/data/repos';
import type { ID, TramiteInstancia, Ciudadano, Adj, EstadoSolicitud, Log } from '@/domain/models/types';
import { dataStore } from '@/data/store';

export class TramitesService {
  async iniciarSolicitud(tramiteId: ID, ciudadano: Ciudadano): Promise<TramiteInstancia> {
    const tramite = await tramiteDefRepo.get(tramiteId);
    if (!tramite) {
      throw new Error('Trámite no encontrado');
    }

    // Generate folio: GAD-YYYYMM-####
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    
    // Get count of instances this month for consecutive number
    const allInstances = await tramiteInstRepo.list();
    const thisMonth = allInstances.items.filter(inst => {
      const instDate = new Date(inst.createdAt);
      return instDate.getFullYear() === year && instDate.getMonth() + 1 === parseInt(month);
    });
    const consecutive = String(thisMonth.length + 1).padStart(4, '0');
    const folio = `GAD-${year}${month}-${consecutive}`;

    const instancia: Partial<TramiteInstancia> = {
      tramiteId,
      ciudadano,
      estado: 'borrador',
      folio,
      historial: [{
        fecha: dataStore.nowISO(),
        estado: 'borrador',
        nota: 'Solicitud iniciada por ciudadano',
      }],
      adjuntos: [],
    };

    return await tramiteInstRepo.create(instancia);
  }

  async guardarAdjunto(id: ID, adj: Adj): Promise<TramiteInstancia> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    const adjuntos = instancia.adjuntos || [];
    adjuntos.push(adj);

    return await tramiteInstRepo.update(id, { adjuntos });
  }

  async enviarSolicitud(id: ID): Promise<TramiteInstancia> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    const nuevoLog: Log = {
      fecha: dataStore.nowISO(),
      estado: 'enviado',
      nota: 'Solicitud enviada por ciudadano',
    };

    const historial = [...instancia.historial, nuevoLog];

    return await tramiteInstRepo.update(id, {
      estado: 'enviado',
      historial,
    });
  }

  async observar(id: ID, nota: string, usuario?: string): Promise<TramiteInstancia> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    if (!nota || nota.trim().length === 0) {
      throw new Error('La nota es obligatoria para observar');
    }

    const nuevoLog: Log = {
      fecha: dataStore.nowISO(),
      estado: 'observado',
      nota,
      usuario,
    };

    const historial = [...instancia.historial, nuevoLog];

    return await tramiteInstRepo.update(id, {
      estado: 'observado',
      historial,
    });
  }

  async aprobar(id: ID, usuario?: string): Promise<TramiteInstancia> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    const nuevoLog: Log = {
      fecha: dataStore.nowISO(),
      estado: 'aprobado',
      nota: 'Solicitud aprobada',
      usuario,
    };

    const historial = [...instancia.historial, nuevoLog];

    return await tramiteInstRepo.update(id, {
      estado: 'aprobado',
      historial,
    });
  }

  async rechazar(id: ID, nota: string, usuario?: string): Promise<TramiteInstancia> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    if (!nota || nota.trim().length === 0) {
      throw new Error('La nota es obligatoria para rechazar');
    }

    const nuevoLog: Log = {
      fecha: dataStore.nowISO(),
      estado: 'rechazado',
      nota,
      usuario,
    };

    const historial = [...instancia.historial, nuevoLog];

    return await tramiteInstRepo.update(id, {
      estado: 'rechazado',
      historial,
    });
  }

  async registrarPago(id: ID, pago: { codigo: string; comprobanteUrl: string }, usuario?: string): Promise<TramiteInstancia> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    const nuevoLog: Log = {
      fecha: dataStore.nowISO(),
      estado: 'pagado',
      nota: `Pago registrado. Código: ${pago.codigo}`,
      usuario,
    };

    const historial = [...instancia.historial, nuevoLog];

    return await tramiteInstRepo.update(id, {
      estado: 'pagado',
      historial,
    });
  }

  async entregar(id: ID, usuario?: string): Promise<{ instancia: TramiteInstancia; pdfBlob: Blob }> {
    const instancia = await tramiteInstRepo.get(id);
    if (!instancia) {
      throw new Error('Solicitud no encontrada');
    }

    const tramite = await tramiteDefRepo.get(instancia.tramiteId);
    if (!tramite) {
      throw new Error('Trámite no encontrado');
    }

    // Generate PDF
    const pdfBlob = await this.generarPDF(instancia, tramite.nombre);

    const nuevoLog: Log = {
      fecha: dataStore.nowISO(),
      estado: 'entregado',
      nota: 'Documento entregado',
      usuario,
    };

    const historial = [...instancia.historial, nuevoLog];

    const updated = await tramiteInstRepo.update(id, {
      estado: 'entregado',
      historial,
    });

    return { instancia: updated, pdfBlob };
  }

  async trackByFolio(folio: string): Promise<TramiteInstancia | null> {
    return await tramiteInstRepo.findByFolio(folio);
  }

  private async generarPDF(instancia: TramiteInstancia, nombreTramite: string): Promise<Blob> {
    // Simple PDF generation using jsPDF (will need to install jspdf and html2canvas)
    // For now, return a simple text blob as placeholder
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${nombreTramite}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .header { text-align: center; border-bottom: 2px solid #0E4A7B; padding-bottom: 20px; margin-bottom: 30px; }
            .content { margin: 20px 0; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #666; }
            .sello { text-align: center; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>GAD PARROQUIAL RURAL DE MEMBRILLAL</h1>
            <h2>${nombreTramite}</h2>
          </div>
          <div class="content">
            <p><strong>Folio:</strong> ${instancia.folio}</p>
            <p><strong>Ciudadano:</strong> ${instancia.ciudadano.nombres}</p>
            <p><strong>Documento:</strong> ${instancia.ciudadano.documento}</p>
            <p><strong>Fecha de Emisión:</strong> ${new Date(instancia.updatedAt).toLocaleDateString('es-EC', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
          </div>
          <div class="sello">
            <p>SELLO OFICIAL</p>
            <p style="border: 2px solid #0E4A7B; padding: 20px; display: inline-block; margin-top: 20px;">
              GAD MEMBRILLAL
            </p>
          </div>
          <div class="footer">
            <p>Este documento ha sido generado electrónicamente y tiene validez legal</p>
          </div>
        </body>
      </html>
    `;

    // For now, return HTML as blob. In production, use jsPDF/html2canvas
    return new Blob([html], { type: 'text/html' });
  }
}

export const tramitesService = new TramitesService();

