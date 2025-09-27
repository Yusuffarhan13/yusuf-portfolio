export const ASCII_BORDERS = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
  },
  rounded: {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
  },
}

export const ASCII_LOGOS = {
  skull: `
     _____ 
    /     \\
   | () () |
    \\  ^  /
     |||||
     |||||`,
  
  brain: `
    .-..-. 
   (_)(_))
   /     \\
  ( ~   ~ )
   \\_____/`,
  
  robot: `
     ___
    |o o|
    |>_<|
   /|[o]|\\
  d |   | b`,
  
  terminal: `
   ╔══════╗
   ║ >_   ║
   ╚══════╝`,
  
  code: `
   < CODE />
   { AI }
   [ DEV ]`,
}

export const YUSUF_ASCII = `
██╗   ██╗██╗   ██╗███████╗██╗   ██╗███████╗
╚██╗ ██╔╝██║   ██║██╔════╝██║   ██║██╔════╝
 ╚████╔╝ ██║   ██║███████╗██║   ██║█████╗  
  ╚██╔╝  ██║   ██║╚════██║██║   ██║██╔══╝  
   ██║   ╚██████╔╝███████║╚██████╔╝██║     
   ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝     `

export const FARHAN_ASCII = `
███████╗ █████╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗
██╔════╝██╔══██╗██╔══██╗██║  ██║██╔══██╗████╗  ██║
█████╗  ███████║██████╔╝███████║███████║██╔██╗ ██║
██╔══╝  ██╔══██║██╔══██╗██╔══██║██╔══██║██║╚██╗██║
██║     ██║  ██║██║  ██║██║  ██║██║  ██║██║ ╚████║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝`

export const AI_ASCII = `
     ╔═══╗ ╔═══╗
     ║ ╔═╝ ║ ╔═╝
     ╠═╣   ╠═╣  
     ║ ╚═╗ ║ ╚═╗
     ╚═══╝ ╚═══╝`

export function ASCIIBorder({ 
  children, 
  type = 'single',
  className = '' 
}: {
  children: React.ReactNode
  type?: 'single' | 'double' | 'rounded'
  className?: string
}) {
  const border = ASCII_BORDERS[type]
  
  return (
    <div className={`ascii-art ${className}`}>
      <div>{border.topLeft}{border.horizontal.repeat(50)}{border.topRight}</div>
      <div className="flex">
        <span>{border.vertical}</span>
        <div className="flex-1 px-2">{children}</div>
        <span>{border.vertical}</span>
      </div>
      <div>{border.bottomLeft}{border.horizontal.repeat(50)}{border.bottomRight}</div>
    </div>
  )
}