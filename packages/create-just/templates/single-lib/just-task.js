const { task, series } = require('just-task');
const { cleanTask, tscTask, jestTask } = require('just-task-preset');

module.exports = function() {
  task('clean', cleanTask());

  task('ts:commonjs', tscTask({ module: 'commonjs', outDir: 'lib-commonjs' }));
  task('ts:esm', tscTask({ module: 'esnext', outDir: 'lib' }));
  task('ts:watch', tscTask({ module: 'esnext', outDir: 'lib', watch: true }));
  task('ts', paralle('ts:commonjs', 'ts:esm'));

  task('jest', jestTask());
  task('jest:watch', jestTask({ watch: true }));

  task('build', series('clean', 'ts', 'jest'));
  task('test', series('clean', 'jest'));
  task('start', series('clean', 'ts:watch'));
  task('start-test', series('clean', 'jest:watch'));
};
