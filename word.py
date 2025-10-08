import os

def es_codigo_frontend(nombre):
    extensiones = (
        '.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss', '.sass', '.html', '.md', '.env', '.cjs', '.mjs'
    )
    archivos_especiales = (
        'package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'vite.config.js', 'vite.config.ts',
        'webpack.config.js', 'webpack.config.ts', 'README', 'README.md', '.env.example', '.env'
    )
    extensiones_bin = (
        '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.DS_Store', '.ttf', '.woff', '.woff2', '.eot', '.mp3', '.mp4'
    )
    if nombre.endswith(extensiones_bin):
        return False
    if nombre.endswith(extensiones) or nombre in archivos_especiales:
        return True
    return False

def exportar_frontend_completo(ruta_proyecto, archivo_salida):
    carpetas_clave = ['src', 'public']
    archivos_exportados = 0
    with open(archivo_salida, 'w', encoding='utf-8') as out:
        for root, dirs, files in os.walk(ruta_proyecto):
            # Incluye solo src, public y raíz
            if not any(c in root for c in carpetas_clave) and root != ruta_proyecto:
                continue
            for filename in files:
                if es_codigo_frontend(filename):
                    filepath = os.path.join(root, filename)
                    try:
                        with open(filepath, 'r', encoding='utf-8') as f:
                            contenido = f.read()
                        out.write(f"{'-'*80}\n")
                        out.write(f"Ruta del archivo: {filepath}\n")
                        out.write(f"{'-'*80}\n")
                        out.write(contenido)
                        out.write("\n\n")
                        archivos_exportados += 1
                    except Exception as e:
                        out.write(f"{'-'*80}\n")
                        out.write(f"ERROR al leer {filepath}: {e}\n")
                        out.write("\n\n")
    print(f"Exportación terminada. Archivos procesados: {archivos_exportados}. Guardado en: {archivo_salida}")

# Define la ruta directamente a la carpeta 'src'
directorio_front = '/Users/luisrojas/Documents/GitHub/arepas-mas-corp2/src'  # <-- tu ruta actual
archivo_salida = 'Codigo_Frontend_Completo.txt'
exportar_frontend_completo(directorio_front, archivo_salida)
