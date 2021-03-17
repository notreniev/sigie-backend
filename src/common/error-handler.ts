export const handleError = (req: Express.Request, resp: Express.Response, err, done) => {

    err.toJSON = () => {
        return {
            message: err.message,
            code: err.statusCode
        }
    }

    const getErrors = (name: string) => {
        console.log('error name', name);
        return ({
            'TypeError': { 'code': 404, 'message': 'Nenhum registro encontrado!' },
            'NotFoundError': { 'code': 404, 'message': 'Nenhum registro encontrado!' },
            'RouteMissingError': { 'code': 400, 'message': 'Rota não encontrada!' },
            'ValidationError': { 'code': 400, 'message': 'Erro de validaçào!' },
            'ER_BAD_FIELD_ERROR': { 'code': 400, 'message': 'Erro ao consultar banco de dados!' },
            'ResourceNotFoundError': { 'code': 400, 'message': 'Rota não encontrada!' },
            'SequelizeUniqueConstraintError': { 'code': 403, 'message': 'Registro duplicado' }
        }[name] || { 'code': 500, 'message': 'Sua requisição não pode ser processada!' })
    }

    const { code, message } = getErrors(err.name)

    err.message = message
    err.statusCode = code

    done()
}
