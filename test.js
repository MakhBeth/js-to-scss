const test = require("tape");
const flattenObjSass = require("./index");

test("timing test", function(t) {
  t.plan(5);

  t.equal(flattenObjSass({ simple: 1 }), "$simple: 1; ");

  t.equal(
    flattenObjSass({
      multiple: 1,
      nest: { nested: "#fff" }
    }),

    "$multiple: 1; $nest-nested: #fff; "
  );

  t.equal(
    flattenObjSass(
      {
        black: "#000",
        brand: "#6699cc"
      },
      "$color-"
    ),
    "$color-black: #000; $color-brand: #6699cc; "
  );

  t.equal(
    flattenObjSass({
      array: ["1rem", 2, "1px solid red"]
    }),
    "$array: (1rem,2,1px solid red); "
  );

  t.equal(
    flattenObjSass(
      {
        transform: 1,
        thatKey: 2,
        complex: {
          a: [1, 2, 3],
          b: "#fff"
        }
      },
      "$transform-",
      (key, val) => {
        if (typeof val === "number") {
          val = val * 100;
        }

        if (key === "thatKey") {
          val = val / 100;
        }

        if (Array.isArray(val)) {
          val = val.map(n => n * 100);
        }

        return val;
      }
    ),
    "$transform-transform: 100; $transform-thatKey: 200; $transform-complex-a: (100,200,300); $transform-complex-b: #fff; "
  );
});
