import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  // Define state variables for image URLs
  const [headerImageUrl, setHeaderImageUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQET0Rdutg60BT4OHYYyJHxb-ikyClutyIQ9w&usqp=CAU"
  );

  const [searchCategories, setSearchCategories] = useState([
    {
      name: "Aesthetic photos created and maintained by snapStore with aim to improve on picture quality and performance",
      imageUrl:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIUAsQMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADsQAAIBAwMCBQEECQMEAwAAAAECAwAEEQUSITFBBhMiUWFxFDKBkQcVI0JSobHB8DNTYhZy0eEkJUP/xAAZAQADAQEBAAAAAAAAAAAAAAABAgMEAAX/xAAjEQADAAICAgMBAQEBAAAAAAAAAQIDERIhEzEEQVEiYUIU/9oADAMBAAIRAxEAPwCOKLAouFMdqyFfcUXFsJwKyujZxJIIPMHxRKWKseOK4hikB5YBfrRIkaL5PbmhzKKGaFoqKS+CR0oeKB7ltqZjIPtRbx3EhBxgHpWWltPblpZXB+BxQ5h4ED6dMME4LDoakt9Q8pfLuFCY71u41COVtiMfMzg7Wzj61EmlX14xilkVY2H3h1rvIFY/0YG+s/s+43C49s81DJcMYQbdmYHjj2pFqPgSK2KSJPK7A5CtIcflSj7Vd6ferYXVwY7fOIywzn8e1LVa9jzC+i42Fmi3KySkEdTj+9FajovnyJcQyFGj9SjPFIbK5VR5cl9tlB4DEc1Ybi4ni09pYnjlbGPUeM0qfQzT2AW15dam0tgoDTRnBbHAoyPRGtQXnkLOB3NBeGLoWdw7SxYkm9RO3jrVluZmuIyqIfV3IozXW2Ja70iG1jCoAgAB7igtQkRZBFxgdT71l1fT2iG38hnOMBlrdlGjqrTJlm5IbnFOsgrx9EQiidQEUAH3qOSBUOFxx2FMrrZHjy4/5VElsXbcRirTZnqBJJb5YkihLi3+KsFxEqttXk0FPAerCqqiLkrk0HWgZocVYJ4uvFL7iLrxR2KJ/KrKP8v4rKPI7QTFGx6nij4Yk445rUMfxRkcYPA61mfFmlckbWLuWwvtREdos21o2wB71wtorf6jGu5bUEgRyFfgVNwVnITT7o0CRNufoMCotk4h/wDko3I981JCrwNhQWPv1ruW7nnbyNmM+wqbllVaBbLTIpCWt0AyeTjrWarqN9ou2eSLzbdcZ2DmmsDSWkQXZlzwKgKPLOW1HHlH7o6AUOI3IWS6vc6yFjtbeRVkXG4j7oqe68Pae1mwvDvfGfW3SmdgIbe+KxlcEZApB4s8iS5JublUCj/8zzRUtr9F5d/iEd9oenajNAqEqIWAMgPIHtUWuw6hZajp+k29032S5ceY2eeOevyKG/6jtbOEw2SM/dpJDzQVx4p1CbMnKKvAcrwKrPx6+wVmlHp9jbRBTs5IAAJrL6S8jVIYzkr3AryqPxJqLDf5zZz+6c5/KpbXxlqKD1uQ4OCXb/zTv4z9CeVez1+zXdABIuHI5JoW6WSG6TbgqfaqXpn6RJUYR3USSp/EvBH9qs2l6pDq8pktrhCSP9NuCKjkw3H0Ux5Jpj6eSEWu9iBjnmoLdjcKWB4x7UKIZGZllOQtSqxWP0jaB2qayBeMnNuiryMk0s1EAEKp611PcTzYjTP1qOW3KqGc5NaIvZlyY9AMqAj5oC4i604YxhcFaDnhBGd3HtVeRDQq8oVujPKT2rKPIGmTwIDR8EQz2oaGM46UZEGHavP8p6MwguOIHripDAACcCo49+OldSOyLlulL5x1hTBTLLHuEcfJPWobm9is9r3DKrfJ5NRXWop6liYBx79BVVuRdT3e++WWbnhUTPFTfy0uii+IXGDXILs4jy2BwQua7fUbfiO5JyTwCM5/Ck9pcrbRr/8AXsiKP4e34UD4k19Us1MUHlysvAPUVfDl8r0iV4fH2zjxb4jgtGCWmc9N3fPxXn+q30tzIGM7EdWBPvQ11fSTzmWQ5I49Xb6D3rkPHLlBGzKx5HJPweO+O1ej1jWkjE3yfsK/aPGZIVVsKWXPcD4710lzAzYRpp5FXcfNPoHHTr8dAKGNwiQiOZELbuAFzkAnjA/Dr/OpoxEWm+0Q7WI9RHLEcY4HTPSkeRnaREGkeWXdEHY8IsQ9A+c56VybiNjGJYgyYxiJeT8fP4VMXt5APLR0jC5RAmzp7kH+dSW1lNeBWthHbRgnzHLghiB9aHNnJEYkCQCUpsUthVUUy0q7HnxNCZY23cOn8X0HautM0yBI0Yo0+csQZwnQ9MHqDzR8Vmu5/Ijit2bkx+aGyPyx+P8AWq49tnPpFu0DxG0knkXxPmHpLnhvr801OqrIHRY2Uqccjg152Hkt2BlQ7GbGXP3D06/Wrdol758Zt5wDMg9LfxCsvy/j/wDcmn4+XvjRYNOx5eSwz8USsYZju+7STzhaSrKufYr7U1S5E6BkYAVhx5S+XH9m7iKLbwB+VK7i2U8gkUcWVmIL5xQty38IrSspkeJoC+z/API1lSbjWUfIgeNjC3UEUfGgUZ4qtWeouLdXdSD7U0s9SWR9h6+1Z3clvHQ2BHtXDgONvX6V0rGQYB60TEkcafPzU2kyipyJ5rEXbCJUxg53Uwg0dI1GAM96LiAXLEipVuY87c80s4oXsF58j6kTa4IdO0+W4lwAo4Hua8X1zVhdSyeYWzzgDGK9L/Sben7NFAjHGCTg15HPb3V3MIQpwD1Ixj6mtfx9Q9oWuVR2LYm9R3glSDjBxzUvmpHEqRAM+csxXHPtzn+1SvYzxqzvCVUEg5yMH+tRRwTSscKMD94kBR+J4q1W2ZlDRA7MzMxz6uuBgGumLuBGzFkOOBx0o9NKvJAxWIgRg7zj7vwfY1n6lumHo8uTIBAD88/GO3el5B4M1ayW0cLpcw7Q/K8jAI9uCf5flRSavGYglzaRuAAAYSyD8aGk0K/SV4tiM0eN5DgKufntS3U7W5sJxFcphsblIbIYHuCOtPFfgKmki42lzHJCjKGQyKQqiM5dQOPVz0rUkEN0xm+ymEMu0gxqG2/BUc/+utA6NpGr3dtFcSxqtqEDJIzopUdjz8+9WKBGtoxHO0Y2eg4fGDj8R06VZUhlNP2DrZTOp2TtPGdvo3DjHb/PyoqwM1vNHIqFWU9Mg8e1cmSHccBRJ/E5XnjgkURHlsHJYH8qqrTWmLw0+i+WaJeQLMCPWOc+9ctavFJgKNlIk1Q6bos91yVt8M46+nvQcP6QtOmx94Lj7xrw8yeO2kj0sW7lPZaXCBcYw3vQMgPODxQEfivSp03G4VfrWrzWbVU9EitkdjSTk/TnjoKwa3ST9fQ/5itU/kkXw0JrbxKGIV0IH0NN9N1aJrrcz7c880phskfG5BTOLTYSgPlqT24qj+K2+mcs8r6LhBqcQjG1wTS+918xudrdKTJpyLzkj6Gtfq9M54Y/NLXxb1rY05sfvQ4i8WxeXiTcD9KHk8WW0Um8ucfSlZtFzgxjFaNpangxqT9Kn/5q/Snkx/hrxHffraTMfqQLkkfTiqtplzsvNgdo42PqXPftkdj8dajksNWtxfXmnO7LHKSY+COfilVx4h1IoFubG1ZscNJETkfGTW3HjSXT7M129+ui5y7Qyo6+bEScBZgARgj655rq40+3a1VGhbyxztBLhhjgAjpzjqKoVt4h1G3kPkrGuTuKhCcn8/j+VNrfxvIOZI5434y0UmQfwNUeOtic50Wiz01g2YkaMKuC8ZYflkdPimS6etohfdK5OcBY+5xznjPvzVds9djvITIL1VX94yy7Svb34pfeeLFtbry7NzdMCAxi5H4cc9uaV4q9hVyXsLbTXZcxSbeFPmNx1Psf5V5f43vrC61t101na2hXywztnc/O4j4z/mKy+8T6pqq/ZHKwhyQSxPcYI/z3oHXtPTTp4dP8phcRDMpZMMxbBA6nPxTY44vv2Lk3S69F88IyNqehW7KIQ8X7GXCrlgpGCc98fPP4UYulNbXczm9bYX3FWbPPcgg5H1/rVP0XV30TSo4Gil3vIzKojYFz0wD3x+FMYfE13cO4h0i7lMXpkwSSnXj470lp8m0NOuKVFoWK1CMBMd2M7gQcfnW/JRVCgszD44pVpWparqgWS10aYRZx5ksqqM9D+6TTn9Vaq1vPJsjgKdYzlt5+v/qh51HVDeHl6AtcusaHqMBcZa1cEZ68V5EJ2C7egr0K+0vUVQPdLEsDkqyhckHnvS610a0RN0lsSPY1XHc12iVzU9IqDXknlhM+kVtNRuUIKyuMDH3quwttDX/Vtdh/5Cuza6EMbY4wT81XjD9knWRfZSf1rdf7zfnWVdvsej/wR1uu8eP/AAHkyfpZIZPYUbHIce1LEcAUVFJkcVVyhE2HhieM1s4HfFBhmPFdnIGW5pWkOtkjzxpwTUYltycg80PKC/KqMfShpRJjCYDVK1+FoLX4dsbSVJZFUZk4b5om+8PaZNC1vPaI8chzjb93Pce1JvCF28DPBKfUDkEn3q37lnBVh1HUVkyYN9op5mutnnlt4A0+01eC8S8X7LncqSNtJPt8jrRXifwDaThr63mtrOIANL5h2x/Unt1PanOqQy2N1jIO4ZQBtgXp3/DuPx4xSO4h1O/1FbKZFNmieZJCk3+oWJVQTjbg7TkAZwevJqczfL2Gr/noReF/0aHVI4r7VhJDbyeqKD7rNH2LexPXH+C8weFtM+zrFbWyW4jOGREA5A7/ANc/Q0JL4tEMi21/FJZyBWYnhtgU9MKckEdx8cUqk8W6tq/2iz0yeysnBWNZpN3mSsw4wrKuDj64rrnJl9+jorg9r2T+NL+x0OzSOO0t571kxG0iriLjlm744zx7V5Xq0c66yrW8815cpGJnZ4GjyVBY7QcEqApOcDpXo98d+m29lqclpcrGQJFQ7GuLkdPNdm3cYLED2HbANZ+3JceONQ1ItcawLazkcSbQg3eXt5XP3Rkj/wA81b48zC6FzVbXfo9X0u307WbC1vrTymini8xQrAlc43fk3X5plZeH9Ps3uZbe1jje6ffOVH3z815R+jnWIrHTbWzuI7bz1d57SVGXzEw3qWTpgek9+jVcJ/0gqnmxw2wnmQnd5BaVUGMknAzjtx7VG8SimkKryWk9l0FlCsYQKoQHO0DioC9vMWT0sveqovia81F4re3gmDSgl5XUx7V6EhW54/vVihj8i3RZZWcr+8ep+tBRTfUjelt0J9egtrPR5Y1G717l3c4NVQKksf7QY+hozxxrMcBihZhy27HxVd0/WLSV8GXBPGK14p49CZK2c6vaRxRlkBI9qqk7OJCCSo+lXmZYpiUZsD5pRdaLHcgtDIMiqON9oRXr2Vnzf+QrKbf9Pyf7w/Ot0vjYeSLPC4LHFGxuewzQMRIopCzZAre5MqoNjIzkkUQdpWl9vCsRJZiSfmi48E+o4HzSOB1Ry6vx6gq1zIyoDxnAol3txxkGoXuLXPlkgH2pGkOmLk1AQziYqVA4q6aXqAljQg8EDmqdqAh2cFenvUGg6nJbsYJGIwfQSe3tU053xGudzs9C1C2e7j8uFDyVYt5hGOev1pPaadHplw0UCvHHdSZfDeoyY4OT8DGfpRmmassgALYxx1o2aGC6kjeSJpdo2kE9vj/O1DNgYmLMl0UDxSoSdLe9t7osWAM8WDvXcMhuTk444/HOagvorKCA74G1RySxe6kCuVPCkHvwqjke+SO1wnsLESzDUMNvGEkZsIo64z2OP7jikg0xVtZLKCaQQBzOLhmZAqg+npxJwo5JA45OeanOl0VvftCLw7a2hdZL5IoLhEEStMoc4wCBtAbJJyOzfypJZQyHxPqHn2cywhZFlU5jJUgttdlPpySoJ64wMU91m1h0KxmkSxa61F5QkMzMFIcgn0qvqJA6+4xXFra6bYWF5bWV4sss6xNcXMk6lNpI8yTcOR3I9sDI4qqX2RbbegLTI57d7PTtUZUi1VBciOQlQkw+F9xgg8HOatOjaELeXz7W6hhYyBjBEC4XJ+7tJycfxZJyeDjFHw3JuYHgklsrvcu15pWHkxJxk52DOPgj3yCaktZrvy2WS5hn2jYJniKs6jHpGSd3/cPjI7kN/iGmW/bD7OzhhdpIVLGTDebNIWZuMcj2Hair65W3tmknkxtGSaGWeGyhLEKHIyccA15r4+8UPclrG2kwCcSFTxj2FdwpLdDbn6Kz4l1dtX1aa4yfLyVj/wC2g4WVCrof2gOcZqBk2AZ7iuQ2ORS62TdPY6udfu7hQr4UgYOO9B/b7hFOJ2GTyBQBkJNRsxrlIOQw/WEv+9JWUu31lHiDmeoCVQvapre6VlIztI9+9LoIxs3H8q04hkZS27r0FbK3romhncTSeTug9THpXdqbpgTMwAxQsEpQ7cBUHTNd7GmmJ839mewpWk+yi6DIvMUE7Ax7GgBZ311dNJNGEUdADTW3CwxBc5HuajGpr9pMeQMe9c4X2crYqOmzy3BUghR3zULaHcJP5s0w2joOlWCfUBGuQN2fahXgku5Q7SbU6kVO/jzXa9jzla6ZFDqCW5UCXLDg8VYrDWkZQshzntmqrqN5p9nlAqs+PxqmXuu3cV2z2UhjQH7uMimjLr+K7FyQn/U9HusElrLJ57BCw+7uAO35Hz81p1k8xmSG2ZXA4kBbgDHbAryHTfH0sOBdQZ9ypzT23/SLaYGX2H5U1R44r0xFTRbY9PaDUGvGSMybjmMZRYsg5K4PORgc8gAVFPpEE995j2q+W5JLgndFlQrL2yDtA44qvj9IFh189c++CP7UPL+kSzVSElJHsqGleBfoyy/4XO38PaTYRhoLC3UZyD5YJHwM8j8KHv7m0s1Ji2x454OK871D9Ik0qlbeJiT3bgVX5tV1LU/MlmlYx9Nijiu2sa37A/6LP4g8UvMxhsmyCfVJn+lU24lLT7mHyaJeImNCo2nHvWfYmKmSY8DsKy1kd1yoZTpaRI95HLbeWIBn+KljqFNE+YFbbGMDvUUmGlxkDNKmcyE4xWbdw47V3NHsJCnI9xUcYGcs3HtTiGeWa1RO63/5VlccXu3OYxQ+7Zcsq9+aysrYxAXUElcZ+0SD4FEWiOIgfOfKn3rVZU2kqKT6GUckv2iPMhK4Ppoi6tIZMyMp3Y7HFZWVeEtAb7BPtP2GAhE3c/vGo5b6RYDIM7j81lZXn5bqa6ZqhJrsUS2yXTb5Pve9JblURnjC9eM1lZUm90BroTHg49qysrK1Gcys+aysrjjWasekP5dlHGAMSZYmsrKlmpqeimNbZNEqteeSV9J71BfRsl15QkbbWqys6b0VpEdtZIWkBJ4BOahgtY2LM2TzWVlUlslSRl8FjjAVfila1lZVpJs6zW6ysoin/9k=",
    },
    {
      name: "Purple Wallpaper Style shot by snapstore studios aiming to improve on quality",
      imageUrl:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4A4AMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEHAP/EADcQAAIBAwMCBQIDBwMFAAAAAAECAwAEEQUhMRJBBhMiUWFxgTKR8BQjUmKhwdFCseEVFnKC8f/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwQABf/EACERAAICAwADAAMBAAAAAAAAAAABAhEDEiEEMUETMlEi/9oADAMBAAIRAxEAPwDarVgFUpRMWO9GyWp8EPOK6BRHTttQ8p9qZSOaOhgK7nPFD5bNXx5xxRAjvVUS1Saq+hjxRTAzvVXweuFCKrw3UFxuaYAQG964zUwt9HkdAzy9OfiiF0RAfXMT/wCtT/JD+jaSE+anHFLKcRxs30FPI9Ns4/xJ1f8AlRY8tFwmAB2FSl5MV6Hjhb9iOPS7p9yFT6mrRo0p/FMv9aZSS4GQarFznYms78yRVYEL5NGlAzHKpPsaFayuo9miY/I3p4swPfc1YpJGOrFNHy5AeFGa3U4Ox+amjDNOL7T47gdS4EgpHNFLbNiZCvtnvWmGRTXCMoOITsaj0ZqlJgaIRgRTM5dKyuKjUpT7UOzGijixjVTPioFzQ8sho0ALV811jQKTVIz/AKzUpZUh6OI9XRy70qSXFEwuW5qUoyAmMzNtzVZky1U9W1Q6sHajGwtjCGPqOaIKdI2oO2nwoGd6Ia4wNzTWwqiD813NDyS1V5hzziqRJyDGO1HabZqx82YAgcULptuZX65Aeij7u7jiHQDxxis3keRqtUXw4m+sZLIoGFbAoa7vPL9IJLfG9L5bgwWhcP0lhyBms7EhmuGmYlvkkf5/tXmzzN8RrhiXtmoS6Zs9TBj9cVGa7dVyCAO59qXp1eWDI42G3xSa/vz1+XCOps4+anKbSHULZoWuyQWJ9IGag150k5OKTQO6Ww6zue1UzXH4QN96nuPojSQXqE88bUXHehhkEYNY63nLnB4/vTCOYuclsKDsaKyNAlBM1UM/Vz3qyaBbiJkkXII5PY1nra66WwVLD3p5azFwNsCtOLKZ546EF9aSWUuGOU7N71yKU45rTXVulxF5ci5U8Edqz8+m3Ns5HR1LnZlr1seVTXfZjcKfCJPVUGWvijp+NSPrUGkxTbHUVyLig5zRMsgPeg5d6DyHalXVioM9ccYqpzgVFqwoliro26aqFdJOKopWIlQV5w96iXyOaFCkmrghxT8QOstjlIOxohZGPNBquDmiFdccUraGVkizUdplt5knmSj0jgY5oNGBYZGacwXHRbny1AxyajmzaxpFMWO3bLru+FtEVAA9gvasy1/Lc3XSBhQd++arvLsusjsxwM4xQulOfPeR940TrI/z968dycn09KMUkXeJtaitStsXO2Acb7/SlX/cEcEZ6FBOOOTSfX45bx0Gf3s0mzfWnlvoUVtApVOonZjzmmSWtj0lxgNx4xt4YiZ54zOeY+ssy/ZQcfelVj4kU6mzuskYIyA+fzFD+J/CxNw0tmnSGOcE8UNpXh67afzJenOcZztWrTD+O76TTlvxcNzFq8d2fRtntmuGYmXJOw3+9UWumG3iLOpzU2iZQMjdq8/6XpBMMoU5H2+KMndv2NmTlRwKS3Nw0Kj07iqpPEsUVuVK9LcEHfJ+KCi5egND7Sr8OoV4y3ueab2l4Y5QVb0Z/CBSLw+6TRCRxgP96Mu4ViYld1O42yKdJpCSpujbWd2syAgjHtRJk+Mj61jtAuiXaIncDOe1PVuOgYdhj3rTizujLPFT4H3KpLCwYLx7VjbpwkrqDsDWsVhJEcMCMc1j9Yj8i5fDAg+xrVDJZGceFDy781U0ooZnY96juaraJ0XNJmqZDtXwFccbUd0jtS0SVEyjPNB+b81X5xzUXJoNDaJgd81eHAHNKYpiO9ELLvzQ3Z2oaWzVTyEHAqtZh3r5pFJpXlaYKLVnOMGmjz9GkZB9TbGk6DJ2q7rY28isT04pM1yhZTA6n0QahfGaCSJcgZI6lplbyNHpkzHf92ifVjt/alN/fWlkBH5OTnJP65pxK0a6NF04CspZ8n/Uay/D0mI0kEviC3RCemNGIyM5PH+a2kcEjx/w55FY7RNSs47+5uXVVmBEaq7ABVH/ACaenX5HkWKM5YkAKKaXOCtNjKPSkkf1nIJ/KmcdnDbpiNBsOcCoWvVDbdbFfNYZ9XApbdX0m5uLgA54U8/apyfwVWwyaLr44qj9lOfUoxSn/q0qyjocEe1NbS/eVMyLkd6lfxj0L9X0xvJMqb47V5VrCTDUGaQdSAnG2e9e5v6ouMqw22rH3eiwyyydUYZCScHkGtXj5FilbEkt40ZHwtr09pI1vIrsnT+7fp3P8p/sea21tqgvLUOuAwGO4NcttJtYowsUK57np3oO+0+SxkE0Q/dt+JQP612WcZStIaCSVMY2t6InaRmHTxljwadm6L2SPJt81kJ7xXKwbESYyP7/AFp4bjyLCND8entUaoLVmq0iVjGAxztzS/xHaDPmr+I9s0u0e9eGcrklO2/FaqWOC+tyJAMkbHGatjn8M+WFGALBTzvU1cHvVWuWq2FyVW4Db/h6cYoKCcmqParMz4xk7Ad6HklHvVUkpxQUkpzzSraR1k8mo53rib1aqVvpHEoyavVqqC4qzFI0jiRc+9c8w+9dVc10x0rghaLIp9xvTZSr25GORSWOHcbUX5pSOlkuUcuOxPcWULajLPdYKJhEU/NG+Ip44beG3twBHjAwPYZ/X0qGoo11bo0Yy4JyM0q1y8j8u3UnqCJhtjjbbf3PxWXV3TPSjJSpmdtNrmbzJFIc56Tlify/zW68GWzMHdwwhTgMvJ+9IoBeRv0WwFqnBAUdR+v6/PmtV4UuJEsLpHuvNfzd8n8Ix2qmTq4c2Fa6jSWsmOo+knAJFYT/ALmjsJVt76J3njHSxb/T8VttXu1/Z5ekgt0kZ9q8d1mLE+ZI853VweR7H5FW8KMbbZnzXVG/tdd066bpbCueCabafePDP09amNwcZPGK8iQPIhWJgGBxvxWr8MWVzqQEE8pVAQT0Nk7fPatPkY8coNtUSxuSfs9PsZmkjLxyLJAw3AO4NVdUbXBjkB9R7f71Xp9vFaQLDEvSF3AFD6lF0sJOshM7N/CfY/BrxVRu+jZ7TykzGpbO+c0DJ60dJVCjHNVabq5VxDLjbgjcVX4j1GKCMktgke2aZdYtNGSVCdQuCWBCPhSO3FbK/RGhCSenCDH6/OsToh861uZjuXkYj7VstRZZLOI5ClUGfoaaf7D/AMKNNI84YJxWrtJmMH4ukjbPIrDWMgU85VztWq0ybNk7NvgfmKSPGLkXBH4oGLn94oy24I4pTHsBTC9mFwCm/pcnegjARxxW1fqefLsiDkmhpRRRjxzVMi710eAB45wD/wA0bFICKSoM0wtsgCtUgjDqFWKw96EZiOKrExzzSpWgjMY966SPegVm2qfnGuoAYJFFcaVW2/vQnUScCmGi6VJqU7xMpAxznAoNHH1iFkk6ekkMcDFMbPwes+px3NzD5dnA3mqG3aWT6dgK1GmaHb6ehGAw9zyKWXHiSx/6tJZB382Ngkang/SjjwPK218G/J+Ol/TFeJbZIdSZs9CnYqR+tqXRXraXfK2CY39JUDJPz9uc078TBb3qkUjY8j3rM6rDI1pEw6g5Tp/rWJe6N0eobzahZ3CyOt1Cyjv1Y3rManHaujM1xEUc8Bh780stbCV1ubhRmBCELfznJwPyNCTW7LwSMcYrXDBo+MSto2MrbR1YR7l0J/EBjNbnQYUsrZURQPfavP8AS76+tgqRNmPJ9JGa2lprMUUEUl4nklgOe+2+Kn5KyNUGMK6auAiSUMWofW54o3SKNladl9EZOOr70oHiOAHy7UGZgcHbAA96jaxGW5knuG6pGOTg9+xHtWHXX2Up+wmFVRGnuFWKRRnAGM1mNcv5rqTD4K52Ybg0yubuW+fywcSIRj+df80Vp/hiXyRcyRlom3J7VSH+ejcXWA6BD02kMY5Jydvkmn2qoJo1iDdIIAYUFpKKdRZFHoV2AojX7V/2tmRyFwMikl2VgBltZElQe3tTmS7NjppHVhn2AoHSupmLTcIN6q1JjOzOeBwPajjjs7JeRPVUVW8nmZLc0SQMc0st36SRmjOslea1mFI+kxvQzHerWyar6cmgg0JYaZW/4aH8jDDH+1GwLhatKaa4ckfOM8VSY96LI3ArhSljKjmgYZWpB8Vb5fxXIraSeYRxAsSew4qilYBnotqt9OkYI68/hO2a9KsbSKwtlQbkdzWf8JeGpNOb9qu5Fcsvpjxx8011G5ZCcnAFJkkooaMbC7meAoRIc/evLtb0yKy1S71m5vvKVd7RV5aT52OQBWludSjD4lZuk7YUjLHsKUSzwahqrQwWRNvpjsGvrqbMYk2zhenc52AzR8bPkVuLpMaeKLpS+AFvdNcLGrWgtWdQPJGfQcc79zzVUtkTG8eCQN8+1G6qyF45Ii2VzhusZOTkknuTVUV2iOMjKsPUfb71jySTdo0wEXlpJGyJAIgHIMYbIGBz99z96W3GnM3VgCn1zE1vqLSDBt51ycdj7/epvAejKgHNb4ZFNJmrGlrSFujacgcNIoON6Slbm7uJJXwzM2CM5AHx9K2+nW4RgZNh3pY9taacihRkD/Tj1NU8+TRUvYJrqO6XpyW6GaU+lQDk/FUXmrhpOiDZcek/P6xVU813fBV6RDB/CD/vUILE5HWw2+KxpK7kKH6PIkk3U5G5z9P1zXp3h6eE2phIDIwwcjmvMLK2MbgJj77Vs/DkzoQjZ+o4oKVS4Syq0JIF/ZPFepWnTgRzEqvsDhgfyNH38JubmIlwsSJ688E//KM8Q6HK+rx6zaBirx+XchBuMcP+Wx+goadMjpPHt7/NBw2mB5KimgWadCPJt0Kxjljy1CzL6CKNZFA7flVEvTitCqHEZJNydsVrCQx2ogD01JyoNUvIOxrnKwJEzxXBVPmj3r5pBjmuoNEAM1egwKptT1DNEts1BKjkdxvXwG9cJrinemOZJgcHHFaHQfDzTlbhZcd6D0CRRfKjoGDe4zW6ubmOytcxRBdv9O1UTSVsFMnJKbW3VWcOQOazupajEwYMpz8GlOqa1PJJgDAzSiS6LHPTv9ayzyuZphjpdGtgIbvU4o1TJDdalht1A+k/mQftVR8QWs+tNpdlbMIYB0gKB0g/Pux7n5oS+1d/D+gR3cEET3WoSvH1kY8tFABwfclqSeBZ1k1C7uHDeY5Y9sbmtEY64qFf+pX/AA0GoSo56cqPyGKXXK2/RiSbPx7UbeW8V1OzeoHOMUG+lQryM1lpWXXoWNNJukbeZEOxFRXUZEIUkgZxwKMuoo4lAVd+PihzbgAyHBOc4rlJfB06PpNZkaPpAKk7ZIqhY2lbzGLSNk5P4cGrYoo1fymGVdQ4+KKgh9QBAIHHvRkzrKoYOncRsCf4mouC1QbgFc9jR0NuoBKkjNEwwKAVBIIO/cVJsGwLHadWDgZHG9N9PRo2HQwGO2ahHACvb8sVcqkcHahdCs0en3YUYf8ApVep6Qk8ZntML3Kgc0vsYST1Z+ea0FmxVcE7VfFO/ZCca9Hn935luxEqEfWl8tx81oPF7k3bA4AHGBWNklOaoyLL3myeapeWoRdc0gjXAJ960+l+C5LzDz3YVfZKeMbCZR5sVxWllOIo3c/yrmvVdP8ABOk2uGaIyuMbvvTuDT7O3XEVuij6VZQObSP/2Q==",
    },
    {
      name: "Dog photos taken from snap studios",
      imageUrl:
        "data:image/jpeg;base64,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",
    },
    // Add more search categories with image URLs
  ]);

  const [momentCategories, setMomentCategories] = useState([
    {
      name: "Education and learning",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0D1BTf79SsmH4qhA0b7fDNqAOEr1SpHMBnw&usqp=CAU",
    },
    {
      name: "Business and marketing",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo32zrQlD3LanB-xRo59X02S-YtAbSr26RAw&usqp=CAU",
    },
    {
      name: "Nature",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7AOJbuOrZg88ReoRZuTxVX-DvKRM7CvM1vA&usqp=CAU",
    },
    {
      name: "Food and drink",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntYZ2qT8tfXch4cb1sMFTil9mwwoFFyAwcw&usqp=CAU",
    },
    {
      name: "Sport",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEPTziArzuYehLQHl94vGH4GPN1L2d3zL79A&usqp=CAU",
    },
    {
      name: "Industry and technology",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa0DukD0UiMYVL9yLcChRVM1NlvwPq8DXtQg&usqp=CAU",
    },
    // Add more moment categories with image URLs
  ]);

  const [imageCounts, setImageCounts] = useState([
    {
      count: "60",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvk7m2KD9VUuEqRpqEa_McKkeNEMmSQz7yUQ&usqp=CAU",
    },
  ]);

  return (
    <div>
      {/* Header */}
      <header
        className="bg-light"
        style={{
          backgroundImage: `url("${headerImageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px", // Adjust the height as needed
          margin: "0",
        }}
      >
        <div className="container text-center py-5">
          <h1
            style={{
              color: "white",
              fontFamily: "Dancing Script",
              marginTop: "1.2rem",
            }}
          >
            Free photos to tell any story
          </h1>
          <p
            style={{
              color: "white",
              fontFamily: "Dancing Script",
              fontSize: "2rem",
            }}
          >
            Find millions of top-quality photos that will leave your audience
            speechless. Elevate your visual content with our vast library of
            captivating visuals and take your storytelling to the next level.
          </p>{" "}
        </div>
      </header>
      {/* Main content */}
      <main className="container my-5">
        <section className="my-5" data-aos="fade-in" data-aos-once="true">
          <ul className="list-unstyled">
            {searchCategories.map((category, index) => (
              <li
                key={index}
                style={{ margin: "1.5rem" }}
                data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              >
                {category.name}
                <img src={category.imageUrl} alt={category.name} />
              </li>
            ))}
          </ul>
        </section>
        <section className="my-5" data-aos="fade-out" data-aos-once="true">
          <h2>The right photo for every moment</h2>
          <p>
            Finding the perfect image to convey your message or evoke the right
            emotions can be a powerful tool in storytelling. Whether you're a
            content creator, marketer, or designer, our collection of
            professional photos is here to help you express your ideas and
            connect with your audience effectively. Browse through an array of
            categories, each filled with high-quality images, and discover the
            ideal visuals to enhance your projects. From breathtaking landscapes
            to intimate portraits, we've curated a diverse range of photos to
            cater to every moment and creative need. Explore the possibilities,
            and let your creativity shine with our extensive photo library.
          </p>{" "}
          <div className="row">
            {momentCategories.map((category, index) => (
              <div className="col-md-4" key={index} data-aos="zoom-in">
                {category.name}
                <img src={category.imageUrl} alt={category.name} />
              </div>
            ))}
          </div>
        </section>
        <section className="my-5" data-aos="fade-in" data-aos-once="true">
          <h2>Keep consistency in your designs</h2>
          <p>
            Ensure consistency in your creative process by easily finding all
            the photos in the same series. Whether you're working on a design
            project, creating marketing materials, or developing a website,
            maintaining a unified visual style is essential. Our collection of
            images in the same series allows you to effortlessly achieve this
            consistency. Explore the selection below to discover the perfect
            images that match your creative vision.
          </p>{" "}
          <div className="row">
            {imageCounts.map((count, index) => (
              <div className="col-md-4" key={index}>
                {count.count} images
                <img src={count.imageUrl} alt={`${count.count} images`} />
              </div>
            ))}
          </div>
        </section>
        <section className="my-5" data-aos="fade-out" data-aos-once="true">
          <h2 className="mb-4">Featured Products</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-4">
                <h3>Product 1</h3>
                <p>
                  Explore the exceptional features and capabilities of Product
                  1. Designed with innovation in mind, this cutting-edge product
                  is poised to revolutionize the way you work and play. With a
                  sleek and modern design, Product 1 not only looks great but
                  also delivers outstanding performance. Whether you're a tech
                  enthusiast, a professional, or simply someone looking for
                  top-notch quality, Product 1 has something to offer. Dive into
                  a world of possibilities and experience the future with
                  Product 1. It's more than just a product; it's a game-changer.
                </p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReqU_bREKSJza1PrZTvak2GNNYReJ-4LdtMw&usqp=CAU"
                  alt="Product 1"
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-4">
                <h3>Product 2</h3>
                <p>
                  Discover the amazing features and benefits of our latest
                  offering, Product 2. This innovative product is designed to
                  make your life easier and more convenient. With a sleek design
                  and cutting-edge technology, Product 2 is the perfect solution
                  for all your needs. Whether you're a professional looking to
                  boost your productivity or a consumer seeking a reliable and
                  stylish gadget, Product 2 has you covered. From its
                  user-friendly interface to its impressive performance, you'll
                  be impressed by what Product 2 has to offer. Explore the
                  possibilities and experience the future with Product 2.
                </p>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2Euhwt3IuUMw-Dq3btDbPz8YrOqO59OE5IQ&usqp=CAU"
                  alt="Product 2"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Inspiration Gallery Section */}
        <section className="my-5" data-aos="fade-in" data-aos-once="true">
          <h2 className="mb-4">Inspiration Gallery</h2>
          <div className="row">
            <div className="col-md-6">
              <p>
                Here is some inspiring content for the gallery. Explore a world
                of creativity and innovation as you immerse yourself in our
                curated collection of inspiring images, artwork, and ideas.
                Whether you're an artist looking for fresh concepts, a designer
                seeking new perspectives, or simply in search of a spark of
                inspiration for your next project, our gallery has something for
                everyone. From breathtaking landscapes to thought-provoking
                abstracts, you'll find a wealth of visual delights that can
                ignite your imagination and fuel your passion for creativity.
                Dive into our Inspiration Gallery and let your creativity soar
                to new heights!
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ir8bTWn8JEAGuK98d6Zqg4f5ql0POE9HDQ&usqp=CAU"
                alt="Inspiration"
                className="img-fluid"
              />
            </div>
          </div>
        </section>

        <section class="my-5" data-aos="fade-out" data-aos-once="true">
          <h2 class="mb-4">snapstore Free Picks</h2>
          <div class="row">
            <div class="col-md-6">
              <p class="text-dark">
                Snapstore offers a plethora of fantastic free picks, making it
                an ideal destination for anyone seeking valuable resources
                without spending a dime. From stunning wallpapers and useful
                productivity tools to entertaining mobile apps and insightful
                articles, Snapstore's collection of complimentary items caters
                to a wide range of interests and needs. Whether you're looking
                to spruce up your device with captivating visuals or enhance
                your productivity with top-notch software, Snapstore's selection
                of free offerings is sure to delight. It's a digital treasure
                trove where users can explore, download, and enjoy these
                costless gems, all at their fingertips.
              </p>

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQ2-JI5waOR8yQA2xEN0Stfhttps://example.com/freepiks.jpgmjnmXyTfiSfQ&usqp=CAU"
                alt="Free Picks"
                class="img-fluid"
              />
              <a href="https://wallpapers.com/cool-pictures/">
                wallpapers snapstore
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
