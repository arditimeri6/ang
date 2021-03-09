@component('mail::message')
# Introduction


Complete your registration on our platform.
{{$verify_token}}

Thanks,<br>
{{ config('app.name') }}
@endcomponent
