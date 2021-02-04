import Addtask from '../../components/Addtask'


export default function(formulateInstance) {
    formulateInstance.extend({
        components: {
            Addtask
        },
        library: {
            autocomplete: {
                classification: 'text',
                component: 'Addtask'
            },

        }
    })
}