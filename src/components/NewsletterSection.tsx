import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeadlessNewsletter } from '@/components/headless/HeadlessNewsletter';
import { Mail } from 'lucide-react';

/**
 * EDITABLE UI COMPONENT - NewsletterSection
 * 
 * Componente UI completamente editable para suscripción a newsletter.
 * El agente IA puede modificar colores, textos, layout, etc.
 * 
 * Consume lógica de HeadlessNewsletter (solo muestra email input).
 */

export const NewsletterSection = () => {
  return (
    <HeadlessNewsletter>
      {(logic) => (
        <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 py-20 border-y">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {logic.success ? (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-accent/20 rounded-full p-4">
                    <Mail className="h-10 w-10 text-accent" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-foreground">
                  ¡Gracias por suscribirte!
                </h3>
                <p className="text-lg text-muted-foreground">
                  Recibirás nuestras mejores ofertas y novedades sobre café con Ganoderma
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                    ¿Quieres recibir ofertas especiales?
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    Suscríbete a nuestro newsletter y obtén descuentos exclusivos en café con Ganoderma
                  </p>
                </div>
                
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    logic.handleSubscribe();
                  }}
                  className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
                >
                  <Input 
                    type="email"
                    placeholder="tu@email.com"
                    value={logic.email}
                    onChange={(e) => logic.setEmail(e.target.value)}
                    disabled={logic.isSubmitting}
                    className="flex-1 h-12 text-base"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={logic.isSubmitting}
                    size="lg"
                    className="sm:w-auto px-8"
                  >
                    {logic.isSubmitting ? 'Suscribiendo...' : 'Suscribirse'}
                  </Button>
                </form>
                
                {logic.error && (
                  <p className="text-sm text-destructive">
                    {logic.error}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </HeadlessNewsletter>
  );
};