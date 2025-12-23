export const BrandLogoLeft = () => {
  return (
    <a href="/" aria-label="Home" className="flex items-center gap-3">
      <img 
        src="/logo.svg" 
        alt="Café con Ganoderma"
        className="h-10 w-auto object-contain" 
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Ganoderma Coffee
      </span>
    </a>
  )
}