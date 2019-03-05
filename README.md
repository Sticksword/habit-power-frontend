# habit-power-frontend

This is the website portion of Habit Power.

## 2 main features:
* Habit Power Profile
  * 2 tabs, one for visuals and one for their success story
  * visuals show visual of how a person is doing for their current challenge and past challenges
  * success story shows their story and how they got to where they are
* "Featured" Homepage - shows a list of users with a small bio and a link to their success story so far (clicking takes them to the profile and opens up the success story tab)
  * Subscribe functionality that collects emails


### misc chart inspiration
  * [dot plot](https://bl.ocks.org/arnicas/9d5d5eb998051caa36c5)
  * [split bar chart](https://bl.ocks.org/eesur/4d0e2d9390bfbb414ec3e517b1497c72)
  * [bullet chart](https://bl.ocks.org/mbostock/4061961)
  * [bullet chart spec](http://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf)

## Other pieces of Habit Power
* Newsletter - shares the success story of a person in tech
* Mobile app
  * 4 views/screens
    * create a challenge / your progress
    * search others
    * how you've inspired others (likes)
    * public profile


## Installation

* `git clone <repository-url>` this repository
* `cd habit-power-frontend`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

