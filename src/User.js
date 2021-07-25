const connection = require('./database');
module.exports = {
    async getPeople(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('usuario').count();

        const usuario = await connection('usuario')
            .join('usuario.user_email')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'usuario.*',
                'usuario.nome',
                'usuario.email',
                'usuatio.text',
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(usuario);
    },
    async addPeople(request, response) {
        const { title, description, value } = request.body;
        const user_email = request.headers.authorization;

        const [email] = await connection('usuario').insert({
            nome,
            user_email
        });

        return response.json({ email });
    },
    async deletePeople(request, response) {
        const { email } = request.params;
        const user_email = request.headers.authorization;

        const user = await connection('usuario')
            .where('email', email)
            .select('user_email')
            .first();

        if (user.user_email != user_email) {
            return response.status(401).json({ erro: 'Operation not permittes.' });

        }

        await connection('usuario').where('email', email).delete();

        return response.status(204).send();
    }
};