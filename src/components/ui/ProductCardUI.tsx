import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (hover effects, etc.)
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="group hover:shadow-xl transition-all duration-300 border-border">
          <CardContent className="p-5">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden relative">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sin imagen
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-accent text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                      Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-muted-foreground text-white text-xs px-2.5 py-1 rounded-full font-semibold shadow-lg">
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {logic.product.title}
              </h3>
              {logic.product.description && (
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {logic.product.description.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </Link>

            {logic.hasVariants && logic.options && (
              <div className="mb-4 space-y-3">
                {logic.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-sm font-semibold mb-2">{opt.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                        const isSelected = logic.selected[opt.name] === val
                        const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                        if (swatch) {
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              title={`${opt.name}: ${val}`}
                              className={`h-7 w-7 rounded-full border-2 transition-all ${
                                isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                              } ${logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''}`}
                              style={{ 
                                backgroundColor: swatch, 
                                borderColor: isSelected ? 'hsl(var(--primary))' : 'hsl(var(--border))'
                              }}
                              aria-label={`${opt.name}: ${val}`}
                            />
                          )
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            className={`border rounded px-2 py-1 text-xs font-medium ${
                              isSelected 
                                ? 'border-black bg-black text-white' 
                                : logic.selected[opt.name] && !isSelected
                                  ? 'border-gray-300 bg-white text-gray-700 opacity-40'
                                  : 'border-gray-300 bg-white text-gray-700'
                            }`}
                            aria-pressed={isSelected}
                            aria-label={`${opt.name}: ${val}`}
                            title={`${opt.name}: ${val}`}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                <span className="font-bold text-lg">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-muted-foreground text-sm line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logic.onAddToCartSuccess()
                  logic.handleAddToCart()
                }}
                disabled={!logic.canAddToCart}
                className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors disabled:opacity-50"
              >
                {logic.inStock ? 'Agregar' : 'Agotado'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}