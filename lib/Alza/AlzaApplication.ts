import { AUTHORIZATION_FORM } from '@orchesty/nodejs-sdk/dist/lib/Application/Base/AApplication';
import { ApplicationInstall } from '@orchesty/nodejs-sdk/dist/lib/Application/Database/ApplicationInstall';
import Field from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Field';
import FieldType from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FieldType';
import Form from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/Form';
import FormStack from '@orchesty/nodejs-sdk/dist/lib/Application/Model/Form/FormStack';
import { ABasicApplication, PASSWORD } from '@orchesty/nodejs-sdk/dist/lib/Authorization/Type/Basic/ABasicApplication';
import RequestDto from '@orchesty/nodejs-sdk/dist/lib/Transport/Curl/RequestDto';
import { HttpMethods } from '@orchesty/nodejs-sdk/dist/lib/Transport/HttpMethods';
import AProcessDto from '@orchesty/nodejs-sdk/dist/lib/Utils/AProcessDto';
import { CommonHeaders, JSON_TYPE, USER } from '@orchesty/nodejs-sdk/dist/lib/Utils/Headers';
import { createHmac } from 'crypto';
import { BodyInit } from 'node-fetch';

export const SERVER = 'server';
export const API = 'api_path';
export const NAME = 'alza';

export default class AlzaApplication extends ABasicApplication {

    public getName(): string {
        return NAME;
    }

    public getPublicName(): string {
        return 'Alza';
    }

    public getDescription(): string {
        return 'One of the largest online consumer electronics retailers & marketplaces in Central Europe';
    }

    public getLogo(): string {
        return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3wAMABEACgAhADVhY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIAgACAAMBIgACEQEDEQH/xAAdAAEAAgIDAQEAAAAAAAAAAAAABwgGCQEEBQMC/8QAWRAAAgEDAgIECAgHDAYIBwAAAAIDAQQFBhIHCBEiMqITFEJSYnKCkiExQUNhcYGRFSMzUaGywgkWGCRTVmOUsbPB0jREVHODwyU1ZHSEo+HjJjdVdZPR0//EABoBAQACAwEAAAAAAAAAAAAAAAAEBQECAwb/xAApEQEAAgIBAwQCAgMBAQAAAAAAAgMBEgQFETEhMkFCIlETIxQVUmEz/9oADAMBAAIRAxEAPwC5QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcdI6TFtR8QdFafq9MxqnEWjp2o2ulrIvsL1jOIyl4aylGPllI6CDNQ8z/DixpIuOjyuXenYrDb+CRm+uSqtT3SM9Qc2WpLijpg9L4yx6ey9zO9xWnu7CTXwrrPq4y5VUflb8GvjL8ceKOUmV59W3sCK/TstFW3p6vUVWL76fyMGXwOPy1u++C9toriNvzq60Zf7THI4k6O2zNV8bfD0QARncAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgB0HJ4Wf1bpfAUrTN6hxeOai9Oy4u0jb7q1I0z3MnwwxbVS3vshlpF/2O1bb70mxTpCmc/EXOVsI+cpnBU3UXNrkHd48BpK1iT5uW+uau1fWRNu33iNNRcfeKeZeX/4irj4pPmrGJYtnqt2+8S4dNvl59HCXMqivre3lrZQNPeXcFtGvw1eV6ItPtqYBqDjfwuwrMs+rrO4dadiyo1xu9pKVX9JQXLZfK5e4a5yuRvb6du1LcztKze0x0iXX0nH3kjS6hn4wt5n+bPT9vVlwmlcnfV+R7qdLda+7vIyz/M/xIyFXXHfgrEI3Y8Ba+EkWnrOzLX3SEATK+BRH4Rpcu2XyyXUOvtbagrLTMaqy95HL24q3TLH7i9XumNAEqMIx9rhKUpe4ABuyF+eVTNLmuCWEp4XwkthR7KX0djdVfcqhQYtdyHZhGx+pcA703RzRXsSfLWjUqjt3U+8rupQ2p2/SVwpa26rQgA86uQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHmZjPYTCRUlzOYsMejdmtzcLF0+9Ua9zu9MES6l5heF2FdoVzj5SdfjTHwNKvv/AlfeIz1LzaxLI8emtIvIlOzPkLja3uR7v1yRDh3We2LhLk1R+Vpun6D5yyRxLV5XVEX5WbooUT1LzG8UMzLXxbK22Ihr83Y2y07z7m7xG+f1LqHPzVmzecyWSf89zcO+31dzdUl19Ksl7so8udD4wv7qLi7w3wEjxZHV+L8Knait5fGHX61j3dBGepOazR1nJJFhcLlsq1OzI+y3RvV3dLfepTgEyHS6o+71R5c6efanzUnNRru+lkXC4zEYiFuxuRriVftbare6RpqPilxE1A71ymr8q6v2ooZ/AJ7ibVMOBLr4tUPEXCV85ecv0zM7tI7M1W6zM3lH5AJPZyAAAAAAAAAAAAAAmLk+zCYrjXZQO9ETJWs1p01/P0b6fpSikOnsaHzH4A1nhs2zMq2F9BcN0earqzHDkV/wAlUot6Zazxls3B+InWRKPG1GRqdNK0+U/Z5N6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgB8I6Tp5PI4/F2tbnIX1tZwr85PKqL97Ee6n47cMdP18HPqi3vpv5KwStx3l6q/bU3jXOfjDWVkY+UnArPqfmyw9u2zTemL2986W+nWBafVRd+771I11PzM8Sct+Lx02OwsX/AGS33vX1ml3d1VJUOn3y+qNLmVRXgZlVelmWlPpMU1PxJ0LpyrR5jVmKtpV+OGk6vL7i9LfoNf8AqPW+sNRt/wBO6myt8u7d4KW4bYvqp2V90x4l19Jz95OEuof84XW1PzRaAxr1hxNvk80/nxReBi96TobukZ6n5rtVXTbdPaexuMi865ka4k/Yov3MV1BNr6dRH4Rpcy2SQNS8ZeJmoGr49q2+hi/krJlt17m3d7Rgl1c3N3cPc3U8s8ztud5XZmb2mPkCXGquv2xcJWSl5AAbsAAAAAAAAAAAAAAAAAAAAAAAAAAA2McC83HqHhFpnJo++tbBIZGr58X4p+8jGbFfuR/Nx3vDXIYRn3TY2/rXZ5sUtNy95ZSwR5LkQ0tlFfVS2hjIADi6gAAAAAAAAAAAAAAAAAAAAAAAAB8bq4gtoHmuJUijSnSzu21afaB9eg5I+1Nxk4a4CKtb7V+Olf8AkrRvGH92Pd0faRrqfmv0paRMun8Bk8pN+eeq28XvdZu6dq+PbP2xcZXwj5ysVQV6ClWpuaTX2QSsWIs8Vhlr5aRNNKv2v1e6RlqbiVr7UlGTMatys8LdqFZ2iib2E2qS4dMtl59HCXOhjw2A6k1rpLTa9Od1HjMfXo7E9yqvX6l7VSNdT8y/DXFLRbC4yGal820t6qq+s0u3u7ijzVZ23MzM3nMfkmw6TDHukjy58/jCy+pubLLyx+D03pa1s2/lr6es3cXbt95iNdUcd+KGfVkl1NLYwt81j0W37y9fvEZAlw4VEPEUaXJtl5y7eUymRytx4zk8hd3038rcSs7e8x1ACTq47AAMsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwXI5mo7LiLlMLK9FpkrDdHT88kTdO33Wev2FzDXPwJzdMBxd0zk5G2RrepDLWvkpL1Kt7rmxjp+A871OGt3f9rbgy2h2cgArk0AAAAAAAAAAAAAAAAAAHB5Of1BgtPW1LnOZnH4yGvZe7uVio31bq/CeuVw56sEtzo3CaiXp8LY3rWzepKu79aJfvOlEIzniGXO2ekMyZfqTmL4X4eOvgMvcZeZfmrG2Zu8+1f0ka6l5tWrE8em9I9EnkTZC46aU+tI/85VoF9X02mPu9VVLmWySzqTmH4o5lHijzUOLienRWOxt6JX323OvvEcZzP5zOOsmazGQyTL2Wubl5dvvMeaCZXTXX7Yo0rJy8yAAdWAAAAAAAAAAAAAAAAAAAADt4vFZPKz+CxmNu76XzLeBnbumN8HZ1AZxh+EPEzLMq2ei8v1usrXEXgF959qmWY/lq4q3NN02Ox9l6M98jfqbjjLlUx90m8abJfVDYJ8tuVTiFJVaz5bTkFP8AvErN/dHv2PKNlHWnj2uLSBvl8DYNL+s6nKXPo/6bx4lv6VkBaheUNdvw6+r0/Rif/ePvHyjWG2m/XFyzfL0Y9f8AOa/7Hj/tt/h2/pVAFrZ+UW2rSlYddTr+ffjKN/zaHwm5RG+a18v1Pif/AHh/seP+z/Et/SrILG5PlL1TF/1bqjD3Xx/6RFJB+rRzxbzlc4lw/kp8Dc/7q8df1kU3jzqM/Zj/ABrf0gwEn5jgDxXxqO7aXe6iT5bS5il3eqqtu7ph2W0Xq/Eo0mT0vm7NE7TzWLqq+1tO0eRXL2ycZU2R8xeCBt2ttbtA692AAAAAAAAAAAfqN2jlSReqyNuU2Z6KzEWf0hiM5D2L+yiuKejuRW6P0msovXyf5xMxwWsLXp/HYu4lspen1t6911+4qOrQ7wjJO6fL8s4TIACjWoAAAAAAAAAAAAAAAAAAOPkI85i8EuoODepLKlKeFhta3cXrRV8J0e1tqv2kiHXvLaK8s57S4SjxTI0UlK+UtadFTMJayxlrKO0ezVwD0NTYuTCajyWGlbc9ldS27N52xmX9k889jCW2O7z0o6gAMgAAAAAAAAAAAAAAEgcOOD2u9ddE2LxbW1hX/Xb3dFF7PlN7KsaWWRrjtJmNcpekUfnoYLB5jO3dLPC4q8yFxX4o7aBnbulweH3LFo/DVS51LcT6guttN0TfirelfVp1m9pvsJswuHxWEsUscRjrXH2yU6Fht4lRafYpW29UhH2R7ptfBzL3KXaQ5Z+I2Zr4TKx2eBg/7TLvevqom7vMpLemOVPSNnErahzWSys3mw7beL3es3eLDnFafSVtnUL5/PZMhxKosF05wh4a4KJUsNHYtq08u5i8Yf3pd1TNLO2trOBYLW3jgiT4KJElFVfsoff4DkiSnKXnLvGMY+AAGGwAAAAAAAAAABxtOQBj2e0ZpPOb2zGmcTfO/aea0Rm97o6SMtR8s/DXJ0d7CDIYeVqfB4tdM6LX1X3E29JydIXzh4k5yqhLzhTXVvKtq6xjkn09mbDMKvZhlWtvK337l7xDGq9Hao0pceA1Hgr7G1r2Wmi/Fv6rdlvZY2YUOtf2drfWr2t7bQ3NvIvQ8cyUdGp9NKk+rqdsff6os+DCXhq6Bd3iNy2aI1HvusH4TTt9XpbdbLvgevpI3xezVSsPErhFrfQVXly2M8Zx6t1chafjYPa8pPa2lnRzqrUG3jTgwAAE1wAAALQchucjS81JpmRq75EivYFr5q9R/wBZCr5KnKlnEwvG3DUlbbDfq9lJX6XXqd9UInOhvRLDtxpa24X7AB5degAAAAAAAAAAAAAAAAAAAACgvNbhEwnGzMVjTZDkFivUp669fvq5FRaLnwwaLd6b1JHH+MdJbKdvoXodP7ZSrp6jgz3ojlRcmOtuQAEtxAAAAAAAAAAAMr4dcPtU6+yniencdJKiMqz3L9WCH13/AGe0SlwI5e8jqqkGf1d4XG4Wu14LderPdU/YT0u03eLgaewuK0/iYcXhbCCxsoV6I4Yl2qpV8vqMYfjX5TKOHmfrNEXCnl40npKsF/nUpqDLJ8PhJk/i8TejH5X1t0/YTWiqi0VVVVp8FKU+Q/YKOy2dstp5WddcYY7RcgA0dAAAAAAAAAAAAAAAAAAAAAAAAAAAD4zxRXEDwzxI8brtdXXppWn5qn2AFdOM/Lbic1SbMaGpDisj8LyWNerbzep5jd31Spefw2VwGXuMXmLGexvLevQ8Mi7Wp/mX0jZ9To6CPuMXCzT3EfD+Bv4qW+ShWvid+i9eL6K+cvolnxOoSr/GfhBv4eJ+sGvIHu680lm9F6juMHnLfwVzF1lanYlT5HSvy0Y8Iv4yjKO0VVKOv45D0NN5OXCahxuYiXdLZXUVwq+cyMrfsnngSjtFiLaPY3MV5ZQXdu/hIZ41ljbzlanTQ7BHXLlnF1Bwa05eVrTwsFt4pL9cVdneotG+0kT5Dx046yzF6KMto93IAMNgAAAAAAAAAAAAAAAAAAQ7zf4NMxwUyFzt3TYueK9i6PW2N3XYokbMteYy1zOjMzib2RIoLyylhd3r0USjIy7jWfJTY7Rt2lbaXvSZ94SiquoR/LGX5ABbIIAAAAAAAD9RpJJIqIrSOzbVVe0zFsuXHgEmPWHVWurJZL2vXs8bL1lg9OWnlN5q+T5XW7P65WOCq42O111qu36b518JjbN1+CBa9mV/T82nk9rtdmy9PhKLnc7v+EFlxeL2/Obk5AKlYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOOOPDXHcSdKSWrqkGVtqM9hddH5N/Nb0G/wDUoFmMbfYfK3OKyNtJbXtrK0U8T9pGXtG0Iq5zqcPFrbw8QcZAtHSqwZSir8a/Ekv7NfZLPp3L1l/HLwgcyjbG2FVQAegVa3/Ipno7nR+c0635WwvFuV+lJV2/oaJvvLH1KS8lGeXGcWZcVKzbMvZPEnrx9de6rl2q/EeY59et8l1w5bVYcgAhpIAAAAAAAAAAAIS5reKGo+F+mcVd6chx73GRuXhd7qJpPBLRd25aUZfh+vpKf6k438Vc+jxZDW2USJ+0loy2qt6P4pVBq2MZzUeAwNu1xnM3jsXCvl3d0kS96pGOqOZXhJhI3rFnpsvOvzGPtnkrX2m2p3jXtcXE9zK0tzPJK7dp3dmZj5m2rbVbjU/OOlIZE0zouTwvkTZG66q/WiU+H3yLNTczXFrMxPFFmrTERP2lx9rRG999zL7LENAD1tQan1HqF92ez2Uym1ty+N3Ty7feY+tm++1RvRPEPUw79MDL5rFl06zW3shc6O0O7ugAv1OAAAAABP8AyncJV1RlV1jn7SrYaxk/isMi9W6nXyvSjXvN7RFfCjRd9r7XFjp2z3LHK2+6mou7wEC9t/2V9JlNiencRj8BhLXD4u3W3srSJYoY18laFX1Hl/xx0j5ymcOjfO+XoHIBQLcAAAAAAAAAAAAAAAAAOAOQcHIAAAAAAAAAAAAAAAAAAADzNSYezz+Av8Lfx+EtL6B4JV9FqdB6YMRzqNYeqsPc6e1JksHdflrC6e3f0trbdx5hOXOpgaYviymVjh2RZeySZn6Oq0sfUbuqnvEGnrePZ/JXGbz90NJ5wyrhLnF03xM09mnbbHb38XhW/omba/dZjZJT4TVitWo25eqymyjhfm6am4eYDOV6N93YRPL0fJJt6Hp724q+rV+sZp3T5ecMnABTrIAAAAAAAAAAFdefTBz5DhRY5iBWb8FZNGn9GKVWj3e/4P7yjJs4474GTUvB7VGGij8JNLjneBfOlTrpT3lU1jm0W0QAGWQAADuYl9twyecp0z6Wb7LhG9I7ceelscuV8doZw90AHqnngAAADK+EuMwmW4h4i11FkrbHYnw/hbqaeTYjKnW8Hu9Lbt9o0slrHZiMdpdlteUnh9+9LQSZy/gqmWzVFmbdTrRQeQn29r2qfmJuPLwWaweWgo2GymPvoqU/1WdJFpT2T1Ok8nbOU55lJ6CuMYx7RcgA5ugAAAAAAAAAABwCK+OPF7DcNcX4FVTIZ6ZN1tZb+rT05G8lf01/SbwhKctYtZSjGO0meam1Hg9MYt8nnsnbY+1X4PCTybemv5l86v0UK+a95rLC2ea00ZhHvXWu1Ly+bZF6yxr1mX62UrZrnWGoNa5p8tqDIy3UzdVE7KRL5qL2VUx8u+P0uEfyn6qy3nSz7Erag5hOKeWq6Ln48bFIvRssbdE2+2ys/eMUuOJXEKd98uttQVr/AN/l/wAxigJ0ePTH2xRJXWS+zLYOJvEOCvTHrfUFP/Hy/wCYy7T/ADFcU8VVaS5qDJxr5F5apXvLtbvESAS49MvdEjdZH5XF4bc0GnsxNDj9XY58Jcv1a3UTeFtqt6XlJ3vrLA2lxBeW0VxbSxzwyLR0kRtytT89KmrksHyicUbrDajh0NmLpnxOQfbYtIzV8Wm8lafmV/1tvnMVfL6fGMd607jcyUpazXMABTrIAAAAAAAAAAAAAAABWrnysPC6V03k+j8hfS2/T/vI93/KKil3udWzpc8GvD/7LkoJez0+S6ftlIT0PTJf0qbmR/tC73JfnvwrwhpjpPyuIvZbb60b8ard+q+yUhLI8iWdrBqbP6bfs3drHdpXzWibbWn20l7pt1KvanLXhS1tW+AB5xdgAAAAAAAAAA/EiK6VRqdKtToqasOI2Dk01r3PYB/jsL+e3VvOVXba3tLtY2pGv7nZ082G443d8v5HM2sV6nosq+CZfei3e0bRbRQgADLIAAAAM4avehbfEj+cu4/Z1sW+6zVfNbadk9VRPeuOXnro6zzgAB1aAAA+trPPbTrPbTywSr1leKRlZfaUzPAcXOJOCej2Gscrtp1dlxL4wnuy7lMHBpKqEvdFmNko+1Pmn+ajXdnIi5bGYjJw9PXqqNDJX2qNtX3SQ8JzY6XnqtMxprK2Na0+GtvIk60+/ZX9BUAESzp1Mvh3jyrY/LYJhOOfC3L7Vg1baWzt8l4r2/R7Ui0X9JnuMymOylstzjsha3kL/Cr28yutftU1fH3s7y7s5Vls7ue2lXrK8TsjL7pGn0nH1k7x6hn5w2j06BU15YHjTxPw1Epa6wyEqUr2LtluP11YkLBc1msrWNEy+CxGSoq9DMm+B2+vrNT9BEn0y6Pj1d486uXlcw46CvOnOazR15Gq5vCZXFzeV4HZcRL7XVbukiac4z8M86n8T1fj4pKU6yXda27f+ZRen7CJPj2w90XeN8JeMpDB1bC9sr+3W5sruC7hb4pIZKOv30P3dTw21vJPPKsUUaVd3avRRVp8dTj2de7BeN/EWx4baMlyclFlyNx0xY+2r87L+evor8bf+pQHUOZyeoM1c5fL3T3V5cvvlkf5a/5TLuPOvp+IPEC7yiyN+DYP4vYRebFTyvWbte0YCel4HFxVDaXlTcu/eWvwAAnIwAAAAAH3x91PYX9vfWjtHcW8qyxOvksrblY+AWjM21V3Mxifgi2f4G+XJ4SxySLtW7to51p+betG/wATv0PK0hZSY3SuJx035W1sYYX9ZUVf8D1aHj5e56KPtcgA1ZAAAAAAAAAAAAAELc5V2lvwSu4X27rm9t4l6fz7t/7FSjJcfnruqJw5wtl0/DPlll6foSKT/OU4PQ9Lj/Spudn+0JH5ac5XAca9PXDt+Jup2spfqlXYveZW9kjg7GLvJ8dkrXIWzbbi1lSeJvNZW3KTbo/yVyijVy1lGTaODoYLIQZbCWOVtq/ib23juE9V13U/tO+eReiwAAAAAAAAAAAVR/dCdPvLiNMaqiVdttPLYT+d113p+o/vFriJObjANqDgPnkiTdPYKl/H/wAJtz9zeBrqABu3AAAAAHoYd+s6e0eieNj32Xiel1T2T0PTbNqtf0pedHW3uAAnoYAAAAAAAAAAAAAAAdh28Xlcnip/D4zJXdjL59vOyN3TK24r8RZcBeYK51Vf3NhexeCmjuKrK1U81XbrL7LGEg0lXXL3RZjZKIAfpaM7bVVmbzVN++GOz8g9vH6P1ZfqsljpnM3KN2WisZWVva2mQYvg7xQyUlI7fRWXXp+W4i8AvvOynKV1cfdJmNcpfDBATDj+W3ivc06ZcRY2X++v4q/qMx7dlyqcQpuitzlNPW9PpuJWbuocc86jH2dI8a3PwgMFpbHlFfoVr3XSrXykhxnT3ml/ZPas+UvS6V/jmqszLT+jiiT+1WOWepUY+W8eHb+lQDMODGAfUvFPT2JSLwsct6kktP6JG3v3VYtdiuWHhlZtuuEzGR+Lq3F50L3KKZtovhPoLRuU/CuncAlneURkWas8srUVvj7bMR7uqV5jnEXavgz2/JnRyAUi1AAAAAAAAAAAAAAAAVW59b+nTpPGK3w/xq4en/41X9oqyTpzt3njPF+3t93VtcTDHt9JpJH/AGlILPT8COtGFFy5bW5AATHFf3laztc9wTwckrbp7JXspP8AhNtXubCUisPIhnXkxGo9NSVXbbzxXsP0712P+onvFnaHlOVXpdKK9oltXjLkAEd2AAAAAAAADztRYyHM4HIYe4/I31rLbyeq61X/ABPRAGpfKWM+NyV1jbpfB3FrO8Eq+ayttb9U65JvNJgP3u8ddSWtF/E3Vz49E3ozqrt7rMy+yRkbtwAAAABytdjqy+S2499a9K7jHz27F99mnq7S26ZZ65iruoR/HEn2ABdKoAAAAAAD928MtzOkFtFJLK7bURF3MzeioH4BLWhuXviPqaNLmbHphLR/nMjXZJt9FO17yqTto7lb0TimWfP31/nZV+bavi8Pur1u8Q7ufRX8u0OJbNTGNHldURWZm7KqpmOneFXEXPxpNjNIZWSF13JJLF4BGX0WfarF+9MaM0ppmPZgNP47H/neC2VXb1m7VTIOgrrOrS+mEuPT/wDrKkeC5XuI9/D4S/mw2K+HsT3DSSdxWXvGXYvlHu2ruyet4o6ebb2FW71Xp+qWuH2keXUb5fZ3jw6ooCxvKtoCBV8cyWfu38rpuERa/Yqf4mR4rl34T2VFZ9OSXci+VPezV7qtRf0EtnBHlybpfZ1jRXH4Yhj+GfD6xWlLfReBTb5VbGNq/fWhkWOxeNx0fg7DHWlmnmwwqlO6d44+A55nKXnLpiMcG05ANWwAAAAAAAAAAAAAAAAAAAAAAAAceScnDMqr01r0UA178y+VXMcb9TXK9iC4W1XrfySKjd5WI5PV1hkPwvq3MZVd228vp513ek7N+0eUeuojrXGLztktpSyAA6sJm5Oc82J4zW9jX8jlrWW0b0aqvhaN96bfaL0Gs7QGbfTuusHnU/1K/imannIrruX2l3KbLonV46Otela06aVPP9Vr1txJa8GX4dn0ABWJwAAAAAAAAAAKX/ugmnvFtWae1QnYvbOSylXzWibcre1SXuFXy+nPPp6uW4L/AIVj/K4a/iuG9JH/ABTL7zo3slCzaLaIADLIAAB6eHf8U8fmseYdvEv0XW3zlJfBnpdhG5cdqsvWAB6VRAAAHaxdhfZO9iscbaT3d1K21IYUZ3ZvRVSVODHAjUuvfAZO+o2GwLdbxmVevOv9Enles3V9Yt/w64daU0Hj6W+nsYsczJRZbuXrzzes/wDhTooV/J6jCr8Y+uUqjiSn6yVs4Zcr+dyfgr7W17TEW3x+JW+17hqfS3ZTvFk9AcOdHaHtli0/g4Lebyrp6b53+t6/D9lPgMx6TkpLuVbd7srKuiFfgABHdwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwY3xMyFcVw61FkVaqtb4y4kVqV+KtI26DJCJObbKNjeBuYVG2vevDarXp86Rat3VY6VR2nHDnZLWGcqGAA9fhQAAAGxzgrnG1Fwq03l3k8JLLYRpK3nSJ1Hr7y1NcZdDkhzkl/wAMbzDSvuri79qRU82KWm9e/wCEKvqkO9W36TODLtPVP4AKBbgAAAAAAAAAAxTi1p9dU8NNR4CnbvMfKkX0S7elK+9RTV0ysrbW7Rtvbs9Y1ecYsAul+KepcDGu2K1yMqwL/RM25O6ym0W0WJgAyyAAAfu3fZOjeax+AbwlrLu1lHaPZkIPlbvvgRvOU+vabavaPVRl3js85KOstX6jSSSVYoo2kd22qqruZmLWcvvLxHBS21Pr61o8/TSW2xcnxJ5rTec3oe95p6nLFwTiwFra6y1Va+EzMtN9layr/oi1+J2p/Kfq+sWMoUvN6ht+Fay43F+834ijjiRY0RURKdC0pTopSh9ACpWAAAAAAAAAAAAAAAAAAAAAAA4PnPNFDHV5ZEjVflduigO76g6ljfWV7G8tld29yiPsasMlHorfm+D5TtgAAAAAAAAAAAAAAAACtvPbmFg0fp/BbeteXz3Va9PkxJt6PelX7iyJTjnqySz8QMLjFajeJ43wtV6eyzyN/glCZwI7XxRuVLWrKvAAPTqUAAAsLyM5x7PiDlsDVvxOSsPDdH9LE3wd13K9Gd8AM5Jp/jDpm/Vuo16tvLu8yX8U36+4jcyvemWHWiWs8ZbFAcHJ5VfAAAAAAAAAAA4KHc9WnkxfGSPLRL1MxYRTP/vU3RN3aJX7S+JWL90D09S70VgNTJ0+Ex189q6+hKu7d7LRL7wiRUtABu3AAAAAHrYl+m12+axZvlE4Tfha9TXmoLfdYWr/APRkLr1ZpVb8r9S173qkGcCNF3mv+IFppy28Itu/428mVfyEC9pv2V9JlNkmGx1niMXbYywhWC0toliijX4lWhYWcztx8Qj5V8eN/dmUneABWJoAAAAAAAAAAAAAAADgHWv7u1sLSS7vbmK2giXpklleiqlPprUrxxQ5oMTjJJLDQ9kmYuF6Ve8uOlIF9Re0/wCj7TrTRO3PaGHOy2MPKxkssUMdZJXVEX46s3RShGureO3DPTdJEl1DHkLhPmccvh2r7VOp3ilGteIOstZS79RZ+6vE3fBD07Iqeqi9UxYtaek4+8lfZ1D/AIwtPqbm2p4KSPTWkW3/ADc+QuPg9pE/zkdZfmT4p361WDJ2ONpX/ZrJK/3m4h0E2HBoh9UaXJtl8srynEniBknat5rLOvu8lb51X3VbaY3eXd3eTtPeXM9zK3aeV2dm9pj4AkxrjH2xcsylJeXk0s2tuCdrMy7fGr24lX6ets/YJpqYJwDxq4jg1pWzVeitcdHPXp86X8a36XM7Y8ndLvbLK+qj2hhyADm6AAAAAAAAAAAAADivxmv3mgyH4S446idXo6QSR269Hk7I1Vu9uL/yvRImdq9FKU6amsnV2SfM6ry2Ylbc97fT3De27N+0WvSo/wBmZK/ny/HGHlAAvlYAAAfu3mkgnSeKRo5UZXRl8llPwBkw2caQyq57SmJzKrt8es4rno/NvSjf4nrfIRByiZp8xwUxkUz75MbNLZM1florbl7rrT7CYDx9sNJywv65bRxkABo6AAAAAAAABGfM5p9dScDdT2i0/G29r47FX0oK+F71FZfaJMOtkLSC/sLixu0pJBcRNFKvnK1OioGpgHoamxUuC1Hk8LO26WwupbV285kZl/ZPPN24AAABkfDHTE+sdf4TTMCu3j94iSMnkxdp29lVZgLnclGgaaX4bfvlvoNuTz+2ZatTrJa0/JL9vwt7VCfzrWVpBY2UFnaxrFBbxrHElPiVVptop2TRoAAAAAAAAAAAAAAAA4r8J4GudVYbRmm7nPZ66WCzgX2nbyUWnytU9qaWOCF5ZWoiJTpZq/FShQTmJ4lXPEPWbtbSsuExzNFYRed50rek233dpK4nGzfPt8I/Iv8A4ovhxm4vak4jZB45pWscIkjeL2EbdXo8ln89v1fJI4APTV1xrjrFS2WSlLvkABuwAAAdjF2c+QyVrj7ZWkmupUgRV8pmbap1yR+WnANqLjPgIK06YbOfx2b6ol3r3tq+0crrP465SZrjtLsv5iLOHG4u0xtv+RtYEhT1VXbT+w7gB5F6LAAAAAAAAAAAAAAAADFeLOX/AAFwz1Hl1k2SW+OnaJv6SqVVO9VTW0Xs5w8uuL4I5C38vJXMNonR629u6jFEy+6TD8JSVPUJfnHAAC1QgAAAABaPkOzUlZNTaceb8V0RXsCfmr1kkr/dfcWrKFcpebkw3G3ExK+2HJRy2UvpKy7l76IX1PN9Shrf3/a44ctqnIAICWAAAAAAAAAADXXzeYBMFx5zfgI/Bw5FYr+On0uvX76uRGWv/dCdPRJf6Y1VElfCyxS2E7eijb0/XlKoGzYABlkLJcgmm3v+JGW1JJGrQ4mx8GtW7SyzNtXuJL7xW0vByCYhrPhZlMrIvRW/yrUT4PjSNFp+szmJMSWQABq1AAAAAAAAAAAAAAAAQ3zc6sbTXCW4tLd2W7zElLKOtG27Ub4Xb3abfaKKFlufHL+F1HprA06V8WtZbtvS8K+xf7pvvK0no+m1607ftTcye1oACwRQAAAAALT8iemadGe1hPE3T1cfbt8nkvL/AMrvFXbO2nvLyG1tommmndURF7TM3ZU2OcItKR6L4eYfTvVaW3g6bhqeVK3WfvVqVnVLta9P2mcGvaff9MuAB59bgAAAAAAAAAAAAAAAKw8+mSomI0viVb4Zbia4ZenzFVV/XYqcTjzsZLxzjClmrqy2GMgiZfzMzSP+q6kHHp+BHWjCi5ctrcgAJjiAAAAAPR0xlJcHqbGZqGvRJYXkVwnrI6t+ybOLaeO4to5oq7kkRXWv0VNWxsO5ecy2d4M6ZvZG3ypZ0t3r0/G0TNF+wU3Vq/SM0/p8vXOEggApVoAAAAAAAAAACEedXT6ZngXfXnQ3hsRdQ3sXR63gm7srN7Jr9NqWvcLHqTRGbwEnRVchYzW3q1ZGWlfvNV0iNHKySLtZG2sbRbRcAAyyGxXlEtfFeXrTC9H5VZ5a+1PJU11GyPlXp0cv+kv+6v8A3rmJMSSaADVqAAAAAAAAAAAAAAAApfz0ROvFTFS17D4aKlK+rPL/AJiAC3fPVp+W70zgtTQQM1MfcPb3LrTspLt2s3o7k2+2VEPS9OltRhScqPazIACcjgAAAEt8BuCuW4hXqZHJLLj9ORN17nb17j0Yun4/pbs09I5XXRrjtJmuuVku2GW8nHDZ8vqD9/WWt6+IY1+iwo3z1x53qp+tWnmlxvlOlhMZYYbFW2KxtvHa2drHSOGJPiVaHePL8m+V89l5RV/FHsAA4uwAAAAAAAAAAAAAHBydLOXsOLw17k5/yVnbyTv9SLu/wGDLXrx5yz5vjHqm9d938feBPVi/FL3UMHPvfXMt9ezXly7STTytK7N5TM25j4HsKo6wjF52yW0u4ADdgAAAAAC4XItmHutDZzCyPu8Rv1mjp5qSp2feRvvKek78kuZew4rXOKaXohyeOemzzpEZXVvZXf7xB6jXtRlI4ktbcLsAA80uwAAAAAAAAAADWVzAYFdN8Z9VYqKPwcS37zRKvkpL+NVfdc2alHOfrBR2PE/FZyGNVXKY+iy18+WJtu73GRfsNotoq5AAyyGxrlMnWfl90q1PkglT3Z5FNcpe7kSzNcjwZlxzt18Xk5oVX0HostO87mJMSWCABq1AAAAAAAAAAAAAAAAePqzCY7Uunr3BZWGk1peRVikX6/lp9NPjKD8YOFOouHWXlS8tprrEs/8AFciidR181vNb0TYfQ699a219ayWt5bRXFvIu14pEoyvT81aVJXF5cqM/+OF9EbWrkF9dTcvnC7N1kf8AAT42d69NZbCZo+j6kr0p3TGK8qGgen4M3qXo/wB/B/8AyLaPVKfsr5cGxTE9XTOns5qXIJjsFirvJXNfIt03bfW81fWLsae5cOF2IrRp8XeZV1ruVr66Zu6m1f0EoYLC4jBWCWWFxlnj7VOzFbRURe6c7erY+kW9fBz9sq48H+WOO1lhy3EGaO4em1kxcLdKLX+lfyvVX3izFpa29laxW1rBHDBEuxI412qtPzUofcFRbfO2XeawrqjDHbDkAHJ0AAAAAAAAAAAAAAAAcU+Ij7mMy1MLwW1Pd9PWls/FqfXKyxftkhEB872Qpa8JrSyVl33uUij2+iqO1f0qp248drY4cb5awzlSwAHrcKIAAAAAAAAMt4OZlsBxT01lll8EsV/EstfQdtj91mMSBpbHaOrMZay2bTqHJjvDjM11BoPBZp5KSPe4+CZ29Nkpu/T0mQ0+I8hLGuez0EZbR7uQAYbAAAAAAAABW/n5wMV/wvxmdpFuuMXkVTf5sUqsrd5YiyBgfH/Ax6k4MaqxTx+EZsc88S+nF+NTvIoGssAG7cLQ/ufmpaW+ptQ6Tlr8F7bpewV3fE0TbWp7SuvuFXjL+DWrH0RxOwWpKOywWtytLno+WB+q6+6zAbQQfC3nhuIEnhkWWKRVdHWvTRlr8VaH3NGgAAAAAAAAAAAAAAAAAAAAAAAAAAAPI1Vm8dpzT95nMpMsFnZxVklatf0U+mtfgO/YTVubGCdl2NLGrtT83TQxr8jsAAyAAAAAAAAAAAAADgqbz6X9Xy+lsZuXbFBcXDL6zJRf1GLZFG+c7J+PcaJbX5MfYQW9fa3S/wDNJvTo7X4ROZLWpCoAPTKcAAAAAAAAAAF4uTLL1yXBmGzZ9zY29nt+j5aKzeFX+8JtKj8h+WaPUOpMEz9W4tYrtE6flRtrf3q/cW4PLc2v+O+S840tqsAAIruAAAAAAAAHzljjljZHVXR16K0r8VaH0AGqjXmG/e7rfN4Fd23HX89qvT5qOyqeMTVzqYRMRx3yFxEiomUtYL1aL523Y3eiZiFTduAAC+fJjxDXVnDpNN39zvy+BosW1qdZ7X5pvZ7P2L+cn01d8I9c5Lh5rrH6lx7NIsD7Lq33bVngbtI37PpKpsq0fn8bqrTdjqDD3CT2N9FSWJ/j+ulfppX4PsMSYk9oAGrUAAAAAAAAAAAAAAAAAAAAADg5K3c1nGRcLaz6H0zcK2TuUqmQuUf/AEVGp2F/pG7vrV6vSmqVs9YudlmK8d8sB5o+KNdY6sg0dgp9+FsbhVndKt/Grjdtr6yL2aelur5pcq3XwUCR08laUNaHD+0W/wBeafs2XctxlbeJlbyt0qqbM6fETeoVRpxCGEfi2SsznOXIAK5MAAAAAAAAAAAAAH5+U148xl5S+43apmo/TRL3wPuKqfsmw+prT4mXPjnEfU11Rt3hstdP2t3alYtOlY/szlA5+fxwx0AF+qwAAAdvF4zJZW48WxmPu76b+St4mlb3VJD0zwH4o56iyxablsYW+cyEiwd1uv3TlZdXX7pMxrlLxFGILM6Y5S8rMm/U2q7S1/obGGs3fk27fdYkvTHLTw1xNK1v7a/zUvyNeXHQq/Use3vbiJPqVMf/AFJjw7ZKOqrO21VZmbyVMs0zwy19qRVkw+ksrPC3ZmeHwUTe2+1S/wDpvRmlNNpVMFp3GY/pp8LwWyq9frbtVMh+4iWdWl9Iu8en/vKrfLrwQ19o/XWP1VmJsbZW8SSpPZ0nZ53R0am3qrs7W1u15JaQHJWXXStltJOqqjVHXAADk6AAAAAAAAAAAqd+6F4WNsdpbUkca0eOWaxlfzlalHRe6/3lQDYlzfYOPN8Bc63gvCTY7wV9F9Hg5Kbm9yrmu02i2iAAyyE18rvGi44cZz8DZd2l0vfyr4anlWsjfB4VfR85f8pCgA2zY+8tb+yhvrKdJ7WdFeKVK7lda/FWh2jX/wAuHHrJ8O7yLCZ6st9paWvwp2pLOvnp5y+cvu+levTOdxOo8Lb5nCZCC+sbhd0U0Tblb/8AVfoNGj1QAAAAAAAAAAAAAAAAABx8QPhdXEFrbSXFxNHDDGtXd3batKfnrUq/x95jKdFxpvh7c7q9ZLnLL5Pow/5/d847UUTulrFzttjXHvllPMfxyt9I28+mdLXEc2femyaZa7lsqftP6PyFNLq4nubiW5uZZJZpWZ3d23MzN5TMfiR5JHZ5ZGkdm3MzNuZmPyek4vFjRHthS33ytl6ss4Nor8XNIUb/AOt2jf8AnqbIqfGa6uAf/wA59J//AHKL9Y2K0+Mqerf/AEwndP8AblyACrWAAAAAAAAAAAAAA4r8RrH1pbeJ6wzdp1vxF/PF1l2t1XZTZway+PttPYcaNYWrttX8MXEqrRurtd2de6xM4XJxRLPojX0Zt7PCkmiT8o6r7R15L+Bezuk9U8kEqzqk5e3DnHp8Ps70mSf5uNV9Y+Ml5cv5e31eqdcESfLtn5ykx41UfGGxPlJy8Wa4E4CWkcUc1sr2k9ESi7mjaqq1fpZNjEulVf3PnULzYDUmlpNvRa3MV9D5zeFXY/u+CX3i1RGl5dOwADUAAAAAAAAAAAAAAAAAAB5uo8XBmtO5LDXS7oL+1ltpaei61Vv7TVPfW0tne3FnOrLLBK0Tq3ksrbWNtRrY5nsIuB47aqtETZFPeeNp/wAdVlbvOxtFtFGwAMsgAAGc8JuKereGuV8awF9utXb+M2M3wwT+z5LekpgwA2LcJ+O2jNdwwWrXFMPmH6viN3J26/0b9l/1voJZpXpNVePk6bWJlbrKpK/Drjrr7RdIrVMj+FscnV8UyG51VfRftL7230Sxn03Mo71qzHM1lrNf0Ff9Fc0mjMnFHFqSxvsHctXbV6L4xB9e5et3SXtN630lqOiVwmpMXfVf4kiuF8J7naIFlFtfuimRthPxlkYODk5OgAAABwAFTG9R660fp1JGzepcZZOlOtFJcr4Snsdr9BEetOaPReNhli03Y32cuqfAjVXxeCv07m63dOtdFs/bFzlbCHnKwHxUI24n8ZtF6Djlgvr9b7JrT4LCzajzdPp/IntFT+IPHziDq5ZLZciuGx8islbaw6nTT0pO03vKvokWNVnZmZmZm8piz4/S8+bcoN3O/wCEk8XeM2reIUr21xcVx2G3dTHWzdCsvpt2nbu+ipGgBcV1RqjrFXyslZLvIABuwyvg5P4txZ0jLuZVpmbNWrTzWlVTZGau8TeS47KWmQg/K2s6Tp6ytuUsT/C11D0dH70cZ/WXKnqPEstlGUE7iXwhjOMrdnJUP+FrqL+aOM/rLnxk5vc0na0tiv6y9SslwrY+U2PKhLwuCclNpOcfOUp1NH41v/EufH+GTqP+ZeJ/rTnDMMxdoy2XPBTD+GRqT+ZmJ/rTj+GRqT+ZmJ/rTmOzpqueCmH8MjUn8zMT/WnH8MjUn8zMT/WnGpqueCmH8MjUn8zMT/WnH8MjUn8zMT/WnGpqueCmH8MjUn8zMT/WnH8MjUn8zMT/AFpxqarnmvPnNxM2M4+ZiVo2WPIwQXcVfOXYqN3kYz3+GRqT+ZmJ/rTkQcc+KF5xUz9jmL3DWmNms7Xxb8S7PvXczLu3eswEegAyyAACdOSDULYfjbDjW+GHM2ctpX0WVfCq3c2+0X8NWHDTPNpniFp/Pq3VsL+CZ6fnRXXevtLuU2mIyulGWu6jU6aGJMSfsAGrUAAAAAAAAAAAAAAAAAAApV+6D4WltrfTueRNvjtg9q9VXtVifd/ZLT3S6pX/AJ7MIuQ4LrlVio0uKyUU2/5VR+mJu86e7QRFDwAbtwAAAAB6eHfpidPNbcd48nEvtuNvnKesej6fZtThR8yvW0HZbcATUVkGJ1trHFRpHjtVZu0ROykV9Kqr7O4ynG8deLFhFSODWF060/2iCKZvedGYjYHKVFcvdFmNk4+JJdh5kOLCR7a5u0lr+d7CLp7qibmO4sOnQuctYm/OlhD095SIgaf4lH/OHT+ez9pJyXHXitkI6xz6yuo1r/s8EULe8iKxiuW1prHLRvFk9VZu8R+0k187K3s7jwAbxorj7YtZWTl5kNXc25gAdfTDQB+JJok7Uir7R15MjBTs7m9k42X1Q8ybxpnLxh2weZJkpG/JxKvrHXkurl/nWX1eqRLOpVR9vqkV8G2Xue0zqvaZVPhJe2yfObvVPGau7tAiWdUn9cJUen4+2XoyZJfm4m9pjryX9zXssq+qp1gRbOZdP5SI8SqPw/bSyP25Gb1mPwARpTlLy7xjiIADDYAAAAAAAAAAAAAAAAAAA2d8D8/XU/CPS+bkfwk0+OiWZvzyouySvvKxrEL0chmoJMlwku8JLJubEZF0ip5sUtN9O/4UxJiSxAANWoAAAAAAAAAAAAAAAAAABiXGHCfvj4WamwvgvCvc4yekSedIq7k71FMtAGo8GT8WsL+9ziZqPCUiaKO0yM6RJ6G9mTuspjBu3AAAAAH0tX8FcJJ5rHumPHvW7+FgSTzlLjplnmCs6hHxJ+wD8SSRp+UdV9ot5TjHyrIx29r9g60l/bU7LM3qqdeTJN83EvtEafMph8u0eJbL4eiGZV7THjSXty/zm31T4MzO3WZm9Yi2dTj9cJMeny+cvakurZPnVb1esdeTJJ83GzeseYCFZ1K2Xt9EmPBqj5duTIz17O1fZOvJNK/alZvaPwCNPkWz8ySY0wj4wAA4uoAAAAAAAAAAAAAAAAAAAAAAAAAAAB28XjcjlbpbTGY+7vrhuzFbxM7e6oHUBKWlOX/ixqFVkh0pPYQ/yuRdbfuv16+ypKOlOTvOXC+E1Tq2xsf6HHwNcVb62bZ0fcwFXCyvIDqCS04h5vTrVXwGSx6zr/vIW+Duyv7pMWk+VfhhiFq+ShyWel+St5c1RF+pYtve3EqaT0No/SiV/e3pnF4t6r0VlgtlWVvWftN95q1ZKADDAAAAAAAAAAAAAAAAAAAAAAoTz04b8G8bPwisTUTK46C4Z9vVq6bom7qL7xApc390Hw3jGj9N59U61nfS2rtSnkypu/5X6SmRtFtEABlkAAA7Ed5LFEsS7er5R1wb1zlD1jlpKuNnufSS5nftSsfMASnKXlmMIx9oADRsAAAAAAAAAAAAAAAAAAAAAAAAAAAD6WtvPd3CW1pBLPM7bUiiTczeqqmfaV4I8VNRv/ENGZKJP5S8VbVPvl27vZAj0FldKcoGsbuSjak1HicVD5tsr3Uv3dRe8xKelOUnh5jHWbNXuXzslO1E8tIIm9lOt3zGzGyi5kOl9C6y1O+3AaXy+SXynhtXZF9Z+ypsb0tws4d6ZZZMLo7EW0ydmZrekstP+I+5v0mYqqotFWlFpT5KDY2UG0nyr8Usw27JQY3ARedeXW929VYt3e2kpaT5OsPA/hNU6uvbzp+ZsIFgVfbffu91S1QGxsinSvL3wn08yyxaWhyEy/OZF2uO43U7pI+IxWMxFp4pjMbaWMH8nbQLEv3Kd8GrUAAAAAAAAAAAAAAAAAAAAAAAAAAAAARhzS4T8OcCNUWyRUklt7XxyP4Pi8E1HavuqxreNs2StIb/AB91Yzqrw3MTxSLX5Vam2pql1BjZ8PnshiLuNo7iyupbeVW8lkZlb9U2i2i6YAMsgAAAAAAAAAAAAAAAAAAAAAAAAByqs7KqruZuytAOAZppnhPxJ1I6LidF5mVX7MssDQRe++1e8SnpnlI4hX8sTZrJYbDW9fyn41riVfqVV2198CvALtaa5P8ARdnKkud1Dmctt7UUSpbo/rdpvdZSU9NcF+F2nmpNjtE4msq9mW5j8ZZfppWXd0GNmNmujAaa1HqC4pDgsFksnJX5LS1eX9VST9Mcs/FvNSp4fC22Ghr89kLpV2+ym5+6bBoIYoI6RwxJEi/EqLtofUbGyo+lOThaTJLqjWjNF85b4612tX6pX/yEp6X5auEuClSd8BPlpk7L5G5aVfcXaje0pMoNWryMFpzAYCKsWCwuNxaV+OlpbJF0+7Q9cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa6ObfBvg+PeoKeC8HDfsl/E3n0dF3N7+/3TYuU6/dCcK65jS2o44elJbeaylfzWRldKd9/uY2i2iqoADLIAAAAAAAAAAAAAAGTab4f641JsbB6TzN8j9mWK1fwfv9nvAYyCedO8qPFLJbJMguHwyN2vGbzfIq+rErL3iUtO8nOnodjag1flLxvjdLO2S3X723mNmNlNDuYnEZXL3S2uKxl7fXDttWK1gaVm9lTYnpzgHwlwVUrBo2yu5U8u+Zrnd9NVkrVf0EjY+wssfbUtrCzt7SFadFEgioi0+yg2Nmu/TfLvxczjRVXSsuPiftS38qQ7PrVm390lXTfJvlXkR9R6ys4E+cjx9rWVq+q77dvulxgNjZBmneVjhRi2V7uzymZkp8t5eMq+7FsJS07ovSGnaK2B0ziMa606Fe3s0R/e6OkyEGrUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACDedvCtluBV5dRpRpMVeQXnR6O7wTd2UnI8DiFhf3x6Dz2CVVat/j57dOnzmStF/T0AargctRkdkkVlZW2sreScG7cAAAHs6f0pqjUP8A1Dp7LZRd23daWryr7yqSjpvlg4tZhElucZY4hH61Gvryi1+5N7L7SgQqC32meTizpFE+pNaTyO3bhsLWiKv1O9W6fdJS0zy4cJcJFHu022Umj+fyFw8rP6y/AndMbMbNetnaXN5OsFrbSzyt2UijZmb2VJB03wL4r55Eez0XkoIn+J7zba/3rKxsWw2Cw2EtVtcLibHG26/FFaW6RLT7FoemNjZSnTvJ3qy5RJM9qvEY3p7SWsT3DL72xSVNNcpvDLHrE2UmzOZkWnXWa68EjfZHRWp7xYEGuzXZiOmOGugdNrF+BtH4a0ki7EviqvKvtt0t+ky8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANfHELghxEyHFbU1vp3SN/c2H4Rllt7jYsUFUdt9NrvtVvgbyTJNLcouushGkmbzGHwy17Ua1a4lp9dF2r3i8YNtm2yt+luUTQllAjZ7M5nMXFO34Nltom9ldzd8lPS/B7hlpuFExmisRRk+cuYvGJPfl3MZ6DVq+ccccUdI0RURadFKUp0UpQ+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//2SAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIA==';
    }

    public getFormStack(): FormStack {
        const form = new Form(AUTHORIZATION_FORM, 'Authorization settings')
            .addField(new Field(FieldType.TEXT, USER, 'Client', null, true))
            .addField(new Field(FieldType.PASSWORD, PASSWORD, 'Secret', null, true))
            .addField(new Field(FieldType.TEXT, SERVER, 'Server', null, true))
            .addField(new Field(FieldType.TEXT, API, 'Api path', '/rest/api/v1', true));

        return new FormStack().addForm(form);
    }

    public getRequestDto(
        dto: AProcessDto,
        applicationInstall: ApplicationInstall,
        method: HttpMethods,
        _url?: string,
        data?: BodyInit,
    ): RequestDto {
        const headers = {
            [CommonHeaders.CONTENT_TYPE]: JSON_TYPE,
            [CommonHeaders.ACCEPT]: JSON_TYPE,
        };

        if (!_url) {
            throw new Error('Url must be set.');
        }
        const url = `${this.getBaseUrl(applicationInstall)}/${_url}`;
        const token = this.getToken(method, url, applicationInstall);

        const newUrl = `${url}${url.includes('?') ? '&' : '?'}token=${token}`;

        return new RequestDto(newUrl, method, dto, data, headers);
    }

    private getBaseUrl(applicationInstall: ApplicationInstall): string {
        const server = applicationInstall.getSettings()[AUTHORIZATION_FORM][SERVER];
        const apiPath = applicationInstall.getSettings()[AUTHORIZATION_FORM][API];

        return `${server}/${apiPath}`;
    }

    private getToken(
        method: HttpMethods,
        url: string,
        applicationInstall: ApplicationInstall,
    ): string {
        const secret = applicationInstall.getSettings()[AUTHORIZATION_FORM][PASSWORD];
        if (!secret) {
            throw new Error('Invalid secret.');
        }

        const client = applicationInstall.getSettings()[AUTHORIZATION_FORM][USER];
        if (!client) {
            throw new Error('Invalid user.');
        }

        const date = new Date();
        const baseUrl = this.getBaseUrl(applicationInstall);
        return createHmac('sha1', secret, { encoding: 'base64' })
            .update(`${client}+${method}+${API}${url.replace(baseUrl, '')}+${date.toISOString()}`)
            .digest('base64');
    }

}
