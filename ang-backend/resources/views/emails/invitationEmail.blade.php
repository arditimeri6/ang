@component('mail::message')
# Introduction


You are invited to join to {{$business}} team.
@component('mail::button', ['url' => 'http://localhost:4200/register?token='.$invitation_token.'&email='.$email])
Confirm
@endcomponent


Thanks,<br>
{{ config('app.name') }}
@endcomponent
