// Milestone 1
// ●	Replica della grafica con la possibilità di avere messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) assegnando due classi CSS diverse
// ●	Visualizzazione dinamica della lista contatti: tramite la direttiva v -for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// ●	Visualizzazione dinamica dei messaggi: tramite la direttiva v -for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// ●	Click sul contatto mostra la conversazione del contatto cliccato

// Milestone 3
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
// Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
//     Milestone 4
// Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite(es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)


var app = new Vue({
    el: '#root',
    data: {
        contacts: [
            {
                name: 'Michele',
                avatar: '_1.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'

                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'

                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2.png',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'

                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'

                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],

            }, 
            {
                name: 'Samuele',
                avatar: '_3.png',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],

            },
            {
                name: 'Luisa',
                avatar: '_4.png',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],

            },

        ],
        newSendMessage: {},
        newReceiveMessage: {},
        selectedIndex: 0,
        userMessage: '',
        userSearchChat: '',
    },
    methods: {
        clickContact: function (index) {
            //mi creao la funzione per quando clicco su un contatto e gestistco l'active
            this.selectedIndex = index;
        },

        sendMessage: function (selectedIndex){
            var contactMessage = this.contacts[selectedIndex].messages;

            this.newSendMessage.text = this.userMessage;
            this.userMessage = "";  // svuoto il campo input dove si scrive il messaggio
            this.newSendMessage.status = "sent";
            this.newSendMessage.date = dayjs().format('DD/MM/YYYY H:mm:ss'); // mi sono importato la libreria dayjs con la cdn e dalla pagina dedicata di GiTHub ho visto come aggiungere la data
            contactMessage.push(this.newSendMessage);
            this.newSendMessage = {}; // svuoto l'oggetto


            // aggiungo la parte temporizzata che dopo un secondo mi risponde sempre "ok"
            setTimeout ( 
                () => {
                this.newReceiveMessage.text = "Ok";
                this.newReceiveMessage.status = "received";
                this.newReceiveMessage.date = dayjs().format('DD/MM/YYYY H:mm:ss');
                contactMessage.push(this.newReceiveMessage);
                this.newReceiveMessage = {}; // svuoto l'oggetto
                this.scrollToEnd();
            }, 1000);
            
            this.scrollToEnd();
        },

        searchChat: function (){
            // uso il for each per ciclare nell'array e ad ogni iterazione vado a settare visible a false, se "if" nell'array è inclusa il nome che sta cercando l'utente allora setto visible a true e nell'html nel v-for che mi stampta le chat ho messo un v-if che mi farà vedere le chat che hanno visible settato a true
            this.contacts.forEach(
                (element) => {
                    element.visible = false;
                    if (element.name.includes(this.userSearchChat)) {
                        element.visible = true;
                    }
                    setTimeout(
                        // dopo tot secondi svuoto il campo di ricerca
                        () => {
                            this.userSearchChat = ''; 
                        }, 100);
                }
            );
        },

        scrollToEnd: function () {
            this.$nextTick(function () {
                const container = this.$el.querySelector('.wrapper_chat');
                container.scrollTop = container.scrollHeight;
            });
        },
    }
});

