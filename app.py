from flask import Flask, render_template, jsonify, request
import mysql.connector

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/selecionar_cliente/<int:codigo>", methods=['GET'])
def selecionar_cliente(codigo):
    cnx = mysql.connector.connect(host='172.17.0.11', user='marconi', password='idigital123mc', database='opus_bkp')
    cursor = cnx.cursor()

    query = "SELECT ID,NOME_RAZAO, DOC_CPF_CNPJ, STATUS_2, DATA_ALTERACAO, TELEFONE1, TELEFONE2, CELULAR1 FROM " \
            "clientes WHERE ID={}".format(codigo)

    cursor.execute(query)
    # cursor.close()
    cnx.close()
    jrows = jsonify(cursor.fetchall())

    print(jrows.json)

    return jrows.json

@app.route("/cadastro/cliente")
def cliente():
    cnx = mysql.connector.connect(host='172.17.0.11', user='marconi', password='idigital123mc', database='opus_bkp')
    cursor = cnx.cursor()

    query = "SELECT ID,NOME_RAZAO, DOC_CPF_CNPJ, STATUS_2, DATA_ALTERACAO, TELEFONE1, TELEFONE2, CELULAR1 FROM " \
            "clientes WHERE EMPRESA_ID=1 ORDER by ID DESC LIMIT  0,1000"
    cursor.execute(query)
    # cursor.close()
    cnx.close()

    return render_template("/cadastro/cliente/index.html", cursor=cursor)


if __name__ == "__main__":
    app.run(debug=True)
