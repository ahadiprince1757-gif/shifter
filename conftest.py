"""
Root conftest.py — makes the project root the pytest rootdir so that
  `from engine.xxx import ...` imports resolve correctly when pytest is
  invoked from any subdirectory.

Usage:
  python -m pytest engine/tests/test_engine.py -v
"""
