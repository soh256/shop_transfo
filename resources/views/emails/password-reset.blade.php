@component('mail::message')
# Salut {{$user->first_name}}!

Quelqu'un a demandé à réinitialiser votre mot de passe. Vous pouvez le faire en suivant ce lien.

@component('mail::button', ['url' => "{$url}"])
    Réinitialiser mon mot de passe
@endcomponent

Si vous n'êtes pas à l'origine de cette demande, merci d'ignorer cet email.
@endcomponent
