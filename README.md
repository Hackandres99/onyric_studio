# Para realizar el web scraping de la pagina de oniric studio en Artstation

# Instalar python
# Instalar extension python de microsoft para poder desarrollar aplicaciones
# Seleccionar el interprete de python a utilizar (la version de python descargada)

# Instalar un paquete de software libre (Xampp, Laragon)

# Crear un entorno virtual para instalar modulos solo a nivel de la aplicación
# y no en el sistema operativo es decir a nivel global
* python -m venv env: crea un entorno virtual llamado env
* cd env
* .\Scripts\activate: para activar el entorno virtual
* pip list: para revisar los modulos en el entono virtual
* para instalar otros modulos en el entorno virtual
    - pip install (nombre del modulo)

# Crear un archivo main.py y siempre ejecutarlo con el comando:
* python main.py: para que tome en cuenta los modulos instalados en el entorno virtual y que no lo ejecute de manera global ya que este no cuenta con los modulos

# Instalacion de modulos
* pip install --upgrade pip: para actualizar la verison de pip
* pip install selenium
* pip install bs4: aqui viene incluida la libreria de BeautifulSoup
* pip install mysql-connector-python