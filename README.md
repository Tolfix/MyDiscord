<p align="center">
  <img width="260" src="https://cdn.tolfix.com/images/TX-Small.png">
  <br/>
  MyDiscord - Dynamic Readme Status For Discord
</p>

# How to
Copy your ID from discord, then add it in the following link: `https://mydiscord.tolfix.com/?userId=`

Then you can start adding like an image.

# Customization 

* `userId` : The users id from discord, if none it can't generate a readme.
* `banner` : Gives you the choice of picking an image from an url as a banner.
  * `banner=https://cdn.tolfix.com/images/mountmywaves3.gif` : Custom banner of own liking
  * `banner=true` : If you have a banner in discord, it will grab it and use it as a banner.
* `stroke_circle` : Makes it possible to add a stroke around your profile picture
  * `stroke_circle=banner` : If you got a custom banner, you can pick banner and it will pick the common color and use it as a stroke
  * `stroke_circle=profile` : If you pick `profile` it will pick the most common color on your pofile and use it as a stroke
  * `stroke_circle=FFFFFF` : You can pick a custom color, needs to be **6** characters long otherwise it will fail (for now).

# Showcase
`https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif`
![With banner](https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif)

`https://mydiscord.tolfix.com/?userId=269870630738853888`
<br/>
![No banner](https://mydiscord.tolfix.com/?userId=269870630738853888&&&)

`https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif&stroke_circle=profile`
<br/>
![Stroke Circle](https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif&stroke_circle=profile)


`https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif&stroke_circle=banner`
<br/>
![Stroke Circle](https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif&stroke_circle=banner&&&)


`https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif&stroke_circle=00CFF0`
<br/>
![Stroke Circle](https://mydiscord.tolfix.com/?userId=269870630738853888&banner=https://cdn.tolfix.com/images/mountmywaves3.gif&stroke_circle=00CFF0&)

`https://mydiscord.tolfix.com/?userId=269870630738853888&banner=true`
</br>
![Grabbing banner](https://mydiscord.tolfix.com/?userId=269870630738853888&banner=true)
