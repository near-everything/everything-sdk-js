<div id="top"></div>

<!-- PROJECT SHIELDS -->

[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/near-everything/everything-sdk-js">
    <img src="./everything.png" alt="Logo" width="80" height="80">
  </a>

<h2 align="center"><strong>everything</strong> sdk js</h3>

  <p align="center">
    a javascript sdk for connecting applications, marketplaces, and services to the inventory of <strong>everything</strong> and its ecosystem.
    <br />
    <!-- <a href="https://documentation.everything.dev"><strong>Explore the docs »</strong></a> -->
    <!-- <br /> -->
    <br />
    <a href="https://everything.dev">learn more</a>
    ·
    <a href="https://github.com/near-everything/everything-sdk-js/issues">report bug</a>
    ·
    <a href="https://github.com/near-everything/everything-sdk-js/issues">request feature</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## about

**everything** is a framework for putting it all together; it provides methods for creating and querying data in both Web2 and Web3 in order to foster opinionated development of real world applications, marketplaces, and services for the interconnected economy of tomorrow.

SDK development funded by [Mintbase Grant Program](https://github.com/near-everything/mintbase-grants-program)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE -->

## usage

The methods provided in this SDK require Auth0 integration for connecting to **everything** and Mintbase integration for connected to [NEAR Protocol](https://near.org).

### Setting up Auth0

Follow the steps in [Auth0 Documentation](https://auth0.com/docs/get-started) for your specific application.

_IN PROGRESS_: We are working to create a custom SSO login that can be available in development of your own apps to generate your own AUTH0_CLIENT_SECRET. Unfortunately, until then, the same AUTH0_CLIENT_SECRET must be shared across all participating applications. If you want to develop a participating application, please reach out to elliot@everything.dev.

</br>

### Setting up Mintbase

Follow the steps in [Mintbase Documentation](https://docs.mintbase.io/dev/getting-started) for your specific application.

</br>

### Using the SDK

With Auth0 and Mintbase configured and integrated, you can now use the available SDK methods.

Visit the corresponding documentation:

[Creating Things and Minting References](./packages/sdk/src/thing/)

[Creating Media and Associating Tagss](./packages/sdk/src/media/)

[Reading Data](./packages/data/src)

</br>
<!-- TESTING -->

## testing

### Unit tests

1. Clone the repo
2. Install packages

``` bash
npm install
```

3. Run tests (this will run tests from all packages)

``` bash
npm test
```

### Interactive testing (playground)

1. Run the Dockerfile

``` bash
docker-compose up
```

This will automatically set up the environment, start any necessary mock services, and run the tests. View the terminal to see test results.

2. Open the [playground](http://localhost:8000) in browser to interact with the SDK methods or query data

_IN PROGRESS_: Local is currently not connecting to the everything api because I don't want to move it to the mono repo...
A live version of the app can be used [here](https://playground.everything.dev) which is connected to test environemnt.

</br>


<!-- CONTRIBUTING -->

## contributing

To run the project in development:

1. Clone the repository
2. Start the development playground and enable change watching and hot-reload.

``` bash
npm run dev
```

3. Make changes, write tests, and then open a pull request for review.

Thanks for contributing!

</br>

<!-- LICENSE -->

## license

distributed under the MIT License. see `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/near-everything/everything-sdk-js.svg?style=for-the-badge
[license-url]: https://github.com/near-everything/everything-sdk-js/blob/main/LICENSE