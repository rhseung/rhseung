라이브러리는 주로 연산자 오버로딩과 같은 방법을 통해 코드 상에서 할 수 있는 최대한의 직관성을 뽐내는 코드를 작성할 수 있도록 디자인 해야한다고 생각한다.

[breandan](https://github.com/breandan)의 [Yuri](https://github.com/breandan/yuri)를 보면,
```kotlin
val URI = listOf(
    Y.uri(localhost),
    Y.uri(localhost /bin),
    Y.uri(localhost /bin/sh),
    Y.uri(localhost /bin/sh.distrib),
    Y.uri(localhost /bin/sh.distrib/sh),
    Y.uri(localhost /etc),
    Y.uri(localhost /etc/vim),
    Y.uri(localhost /etc/script.sh),
    Y.uri(localhost /usr),
    Y.uri(localhost /usr/bin/vim),
    Y.uri(localhost /usr/local),
    Y.uri(localhost /usr/local/bin),
    Y.uri(localhost /usr/local/bin/sh),

    Y.uri(projectDir),
    Y.uri(projectDir /gradle),
    Y.uri(projectDir /gradlew),
    Y.uri(projectDir /settings_dot_gradle),
    Y.uri(projectDir /src/main),
    Y.uri(projectDir /src/main/kotlin)
)
```
URI를 `/`연산자 오버로딩으로 직관적인 코드를 작성하는 것을 볼 수 있다.

또한, 동일 인물의 다른 레포지토리인 [breandan](https://github.com/breandan)의 [Kaliningraph](https://github.com/breandan/galoisenne)를 보면,
```kotlin
val x = LabeledGraph { a - b - c - d - e; a - c - e }
val y = LabeledGraph { b - c - d - e - f; b - d - f }
assertEquals(x == y) // true
```
그래프를 각 vertex를 정의한 후 `-`연산자를 오버로딩하여 우아한 코드를 만들어낸다.